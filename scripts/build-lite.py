"""Build the image-only lightweight edition from the current V2 site."""
from pathlib import Path
import hashlib
import json
import re
import shutil

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "lite"
VERSION = "20261015-lite1"
RUNTIME_VERSION = "20261015-bao9"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def build():
    DEST.mkdir(exist_ok=True)
    # Use exactly the main edition's runtime, including its animated video.
    runtime = list(ROOT.glob("*.js")) + list(ROOT.glob("*.css"))
    runtime += list((ROOT / "assets").glob("*"))
    runtime += list(ROOT.glob("*.svg"))
    for source in runtime:
        if not source.is_file():
            continue
        target = DEST / source.relative_to(ROOT)
        target.parent.mkdir(parents=True, exist_ok=True)
        if source.suffix == ".js":
            content = source.read_text(encoding="utf-8")
            # Cache-bust image URLs only; preserve executable behavior.
            content = re.sub(r"(\$\{file\})\?v=[\w-]+", r"\1", content)
            content = re.sub(r"\.webp(?:\?v=[\w-]+)?", ".webp?v=" + VERSION, content)
            target.write_text(content, encoding="utf-8", newline="")
        else:
            shutil.copy2(source, target)

    shutil.copy2(ROOT / "hero-loop.mp4", DEST / "hero-loop.mp4")
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    html = html.replace("作品集 V2。", "作品集 V2 轻量版。")
    html = html.replace("— V2</title>", "— V2 Lite</title>")
    html = re.sub(r'((?:src|href)="\./[^"?]+)(?:\?[^"\s]+)?"',
                  lambda m: m[1] + "?v=" + RUNTIME_VERSION + '"', html)
    (DEST / "index.html").write_text(html, encoding="utf-8", newline="")

    sources = list(ROOT.glob("*.webp"))
    for folder in ["projects", "sports", "luoxiaofen"]:
        sources += list((ROOT / folder).glob("*.webp"))
    records = []
    for source in sorted(sources):
        relative = source.relative_to(ROOT)
        target = DEST / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(source) as original:
            # Preserve proportions, avoid cropping, cap the long edge at 1280.
            limit = 600 if relative.as_posix() == "portrait.webp" else 1280
            scale = min(0.8, limit / max(original.size))
            size = tuple(max(1, round(value * scale)) for value in original.size)
            reduced = original.resize(size, Image.Resampling.LANCZOS)
            reduced.save(target, "WEBP", quality=88, method=6)
            with Image.open(target) as check:
                check.load()
                assert check.size == size
            records.append({"file": relative.as_posix(), "original_dimensions": original.size,
                            "lite_dimensions": size, "original_bytes": source.stat().st_size,
                            "lite_bytes": target.stat().st_size})

    original_bytes = sum(row["original_bytes"] for row in records)
    lite_bytes = sum(row["lite_bytes"] for row in records)
    report = {"version": VERSION, "image_count": len(records),
              "original_image_bytes": original_bytes, "lite_image_bytes": lite_bytes,
              "image_bytes_reduction_percent": round(100 * (1 - lite_bytes / original_bytes), 1),
              "video_sha256": digest(ROOT / "hero-loop.mp4"), "images": records}
    assert report["video_sha256"] == digest(DEST / "hero-loop.mp4")
    (DEST / "image-manifest.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({key: value for key, value in report.items() if key != "images"}, ensure_ascii=False))


if __name__ == "__main__":
    build()
