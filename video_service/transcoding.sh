
#!/bin/bash

INPUT=$1
OUTPUT_DIR=$2

mkdir -p "$OUTPUT_DIR/240p" "$OUTPUT_DIR/480p" "$OUTPUT_DIR/720p"

# 240p
ffmpeg -i "$INPUT" -vf "scale=w=426:h=240" -c:a aac -ar 48000 -c:v libx264 -profile:v baseline -crf 23 -sc_threshold 0 \
    -g 48 -keyint_min 48 -hls_time 6 -hls_playlist_type vod \
    -b:v 400k -maxrate 450k -bufsize 600k -b:a 64k \
    -hls_segment_filename "$OUTPUT_DIR/240p/%03d.ts" \
    "$OUTPUT_DIR/240p/index.m3u8"

# 480p
ffmpeg -i "$INPUT" -vf "scale=w=854:h=480" -c:a aac -ar 48000 -c:v libx264 -profile:v baseline -crf 23 -sc_threshold 0 \
    -g 48 -keyint_min 48 -hls_time 6 -hls_playlist_type vod \
    -b:v 800k -maxrate 856k -bufsize 1200k -b:a 96k \
    -hls_segment_filename "$OUTPUT_DIR/480p/%03d.ts" \
    "$OUTPUT_DIR/480p/index.m3u8"

# 720p
ffmpeg -i "$INPUT" -vf "scale=w=1280:h=720" -c:a aac -ar 48000 -c:v libx264 -profile:v baseline -crf 23 -sc_threshold 0 \
    -g 48 -keyint_min 48 -hls_time 6 -hls_playlist_type vod \
    -b:v 1400k -maxrate 1498k -bufsize 2100k -b:a 128k \
    -hls_segment_filename "$OUTPUT_DIR/720p/%03d.ts" \
    "$OUTPUT_DIR/720p/index.m3u8"
