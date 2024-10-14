echo "Pulling new code..."

git pull

echo "Building new image..."

docker build -t picosong.site.api .

echo "Removing old docker image and creating new one"

docker stop picosong.api
docker rm picosong.api
docker run --env-file ./.env -d --network host -v /mnt/pico/files:/app/files/files:ro -v /home/pico/allfiles.db:/app/src/db/allfiles.db:rw -v /home/pico/songs.sqlite:/app/src/db/songs.sqlite:ro --name picosong.api picosong.site.api

echo "Done!"
