// This document is created to explore reindex api of Elasticsearch.

// First create an identical index with one of the sample indices datas of elasticsearch

GET /_cat/indices

// We have selected .geoip_databases index. We will use two of its fields as an example. We will create a new index template. But first we have to get mappings of the fields we will use:

GET kibana_sample_data_logs/_mapping


PUT _template/template_test
{
  "index_patterns": ["*indextest"],
  "settings": {
    "number_of_shards": 1
  },
  "mappings": {
    "_source": {
      "enabled": true
    },
            "properties": {
                "@timestamp": {
                    "type": "alias",
                    "path": "timestamp"
                },
                "agent": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "bytes": {
                    "type": "long"
                },
                "clientip": {
                    "type": "ip"
                },
                "event": {
                    "properties": {
                        "dataset": {
                            "type": "keyword"
                        }
                    }
                },
                "extension": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "geo": {
                    "properties": {
                        "coordinates": {
                            "type": "geo_point"
                        },
                        "dest": {
                            "type": "keyword"
                        },
                        "src": {
                            "type": "keyword"
                        },
                        "srcdest": {
                            "type": "keyword"
                        }
                    }
                },
                "host": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "index": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "ip": {
                    "type": "ip"
                },
                "ip_range": {
                    "type": "ip_range"
                },
                "machine": {
                    "properties": {
                        "os": {
                            "type": "text",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "ram": {
                            "type": "long"
                        }
                    }
                },
                "memory": {
                    "type": "double"
                },
                "message": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "phpmemory": {
                    "type": "long"
                },
                "referer": {
                    "type": "keyword"
                },
                "request": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "response": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "tags": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "timestamp": {
                    "type": "date"
                },
                "timestamp_range": {
                    "type": "date_range"
                },
                "url": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "utc_time": {
                    "type": "date"
                }
            }
        }
  }
}

// Create a new index with template mapping
PUT my_first_indextest

// We could see that all the template mapping is done.
GET my_first_indextest/_mapping

// Delete if anything exists
POST /my_first_indextest/_delete_by_query
{
  "query": {
      "match_all": {}
    }
  }
}

// Reindex all the data to my_first_indextest took 7300ms
POST _reindex
{
  "source": {
    "index": "kibana_sample_data_logs"
  },
  "dest": {
    "index": "my_first_indextest"
  }
}


// Create a new index and send data with filters from first index
PUT my_second_indextest

POST _reindex
{
  "source": {
    "index": "my_first_indextest",
    "query": {
    "bool": {
    "filter": [
                {
                    "range": {
                        "timestamp":{
                          "lte":"2021-12-21T10:02:03.162Z",
                          "gte":"2021-12-14T10:02:03.162Z"} 
                    }
                }

            ]
        }
    }
  },
  "dest": {
    "index": "my_second_indextest"
  }
}