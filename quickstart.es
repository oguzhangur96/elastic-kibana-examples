// To install elastic using docker 
// Create a network
// docker network create elastic
// Run official elasticsearch image as container
// docker run --name es01-test --net elastic -p 9200:9200 -p 9300:9300 -d -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.15.1
// Run official kibana image as container
// docker run --name kib01-test --net elastic -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://es01-test:9200" docker.elastic.co/kibana/kibana:7.15.1

// See cluster info and health
GET _cluster/health

// I have a one unassigned shard so I am trying to find why it is unassigned
GET /_cluster/allocation/explain

// Result: a copy of this shard is already allocated to this node
// Looks like I have a replica shard lets find out 
GET /_cat/indices

// Lets change cluster name to a meaningful one. Connect to elasticsearch.
// and change the elasticsearch.yml file
// cluster.name: "elastic-kibana-examples"
// network.host: 0.0.0.0
// node.name: "node-1"
// Stop and start elesticsearch containers

// Check cluster name
GET _cluster/health

// Check node name
GET _nodes/stats

// create an index

PUT this-is-a-test

// Use post to save a document when you want elastic to create unique id
POST this-is-a-test/_doc
{
    "first_name": "Oguzhan Gur",
    "reason": "test"
}

POST this-is-a-test/_doc
{
    "first_name": "John Doe",
    "reason": "test"
}


// USE put if you want them to have a specific id
PUT this-is-a-test/_doc/chicago979695chicago919293
{
  "first_name": "Michael Jordan",
  "reason": "He is too good"
}

// USE PUT index/_create/id to if you do not want to create a document if id exists
PUT this-is-a-test/_create/chicago979695chicago919293
{
    "first_name": "Scottie Pippen",
    "reason": "Will get an error, because we do not want to overwrite Jordan"
}

// USE PUT _bulk to insert more than one document
POST _bulk
{ "create" : { "_index" : "this-is-a-test", "_id" : "chicago879695chicago919293" } }
{"first_name": "Scottie Pippen","reason": "Will get an error, because we do not want to overwrite Jordan"}
{ "create" : { "_index" : "this-is-a-test", "_id" : "chicago979695chicago919293" } }
{"first_name": "Scottie Pippen","reason": "Will get an error, because we do not want to overwrite Jordan"}
{ "create" : { "_index" : "this-is-a-test", "_id" : "chicago679695chicago919293" } }
{"first_name": "Scottie Pippen","reason": "Will get an error, because we do not want to overwrite Jordan"}

// read documents with unique id
GET this-is-a-test/_doc/chicago979695chicago919293

// Update documents with id
POST  this-is-a-test/_update/chicago979695chicago919293
{
    "doc": {
        "first_name": "Kobe Bryant",
        "reason": "Rest in peace"
    }
}

GET this-is-a-test/_doc/chicago979695chicago919293

// DELETE
DELETE this-is-a-test/_doc/chicago979695chicago919293

// Try to read Kobe Bryant's document
GET this-is-a-test/_doc/chicago979695chicago919293

