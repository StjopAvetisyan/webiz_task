
# Use the official MongoDB image from Docker Hub
FROM mongo
LABEL authors="stjop"

ENV MONGO_INITDB_ROOT_USERNAME=username
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_INITDB_DATABASE=task
# Copy the JSON file with data to the container
COPY assets/db_init_data.json /data.json

# Create a directory to hold initialization scripts
RUN mkdir -p /docker-entrypoint-initdb.d

# Create a shell script to import data
RUN echo 'mongoimport --host localhost --db task --collection users --type json --file /data.json --jsonArray' > /docker-entrypoint-initdb.d/init.sh

# Grant execute permissions to the script
RUN chmod +x /docker-entrypoint-initdb.d/init.sh

# Expose the MongoDB port
EXPOSE 6060:27017
CMD ["mongod"]

