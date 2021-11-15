// We send aggregations with post query.
// First lets see our data one more time.

// Get index name to query sample logs data
GET _cat/indices

// Run a simple query
GET kibana_sample_data_logs/_search?size=1

// We start with metric aggregations they are simple agregations which calculate avg, sum, min, max etc.

// Get AVG bytes of all requests
POST kibana_sample_data_logs/_search?size=0
{
    "aggs": {
        "avg_bytes":{"avg":{"field":"bytes"}}
    }
}


// Get AVG bytes of all requests, if you have missing fill them
POST kibana_sample_data_logs/_search?size=0
{
    "aggs": {
        "avg_bytes": {
            "avg": {
                "field": "bytes",
                "missing": 1000000
            }
        }
    }
}


// Lets update a document and see if missing filling is working
POST /kibana_sample_data_logs/_update/MSeKA30BZ4AWMoeP_JUp
{
    "doc" : {
        "bytes": null
    }
}

POST kibana_sample_data_logs/_search?size=0
{
    "aggs": {
        "avg_bytes": {
            "avg": {
                "field": "bytes",
                "missing": 100000000000
            }
        }
    }
}

//Update the document again to run boxplot aggregations
POST /kibana_sample_data_logs/_update/MSeKA30BZ4AWMoeP_JUp
{
    "doc" : {
        "bytes": 0
    }
}

// Boxplot aggregations give boxplot statistics like percentile.

GET kibana_sample_data_logs/_search
{
    "size":0,
    "aggs":{"boxplot_values":{
        "boxplot":{"field":"bytes"}}
    }
}

// Get count of documents
GET kibana_sample_data_logs/_search
{
    "size":0,
    "aggs":{"distinct_count":{
        "cardinality":{"field":"bytes"}}
    }
}

// Get extended statistics of documents.
GET kibana_sample_data_logs/_search
{
    "size":0,
    "aggs":{"byte_stats":{
        "extended_stats":{"field":"bytes"}}
    }
}

// Default sigma value is 2. We could change that.
GET kibana_sample_data_logs/_search
{
    "size": 0,
    "aggs": {
        "byte_stats": {
            "extended_stats": {
                "field": "bytes",
                "sigma": 3
            }
        }
    }
}

// We could also aggregate geo values. Lets create a bounding box

POST kibana_sample_data_logs/_search?size=0
{
    "aggs":{
        "geo_bound_box":{
            "geo_bounds":{"field":"geo.coordinates"}
        }
    }
}

// We could find weighted center of all points.
POST kibana_sample_data_logs/_search?size=0
{   
    "aggs":{
        "weighted_center":{
            "geo_centroid":{"field":"geo.coordinates"}
        }
    }
}

// We could combine this type of aggregation with bucket aggregations.

POST kibana_sample_data_logs/_search?size=0
{
    "aggs":{
        "extensions":{
            "terms":{"field":"extension.keyword"},
            "aggs":{
                "weighted_center":{
                    "geo_centroid":{"field":"geo.coordinates"}
                }
            }
        }
    }
}

// Lets talk about bucket aggregations. They do not calculate metrics, they group documents under buckets.
POST kibana_sample_data_logs/_search?size=0
{
    "aggs":{
        "byte_hist":{
            "histogram":{
                "field":"bytes",
                "interval":1000
            }
        }
    }
}

// We can do nested aggregation also
POST kibana_sample_data_logs/_search?size=0
{
    "aggs":{
        "byte_hist":{
            "histogram":{
                "field":"bytes",
                "interval":1000
            },
            "aggs":{
            "oses":
            {"terms":{
                "field":"machine.os.keyword"}
            }
        }

        }
    }
}