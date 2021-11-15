// This file contains simple queries
// First open up kibana at http://localhost:5601 and add logs Sample Data
// http://localhost:5601/app/home#/tutorial_directory/sampleData

// see health of your indices and find ecommorce index named kibana_sample_data_logs
GET /_cat/indices
GET /_cat/shards

// get one document from logs
GET kibana_sample_data_logs/_search?size=1
{
    "query": {
        "match_all": {}
    }
}

// get all documents with specific query
GET kibana_sample_data_logs/_search
{
    "query": {
        "match": {
            "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css"
        }
    }
}

//  You can track total number of hits with parameter 
GET kibana_sample_data_logs/_search
{
    "track_total_hits": true,
    "query": {
        "match": {
            "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css"
        }
    }
}

GET kibana_sample_data_logs/_search?size=1
{
    "track_total_hits": true,
    "query": {
        "match": {
            "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css"
        }
    }
}


// get all documents with bool query
GET kibana_sample_data_logs/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css"
          }
        },
        {
          "match": {
            "machine.os": "ios"
          }
        }
      ]
    }
  }
}

GET kibana_sample_data_logs/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css"
          }
        },
        {
          "match": {
            "machine.os": "ios"
          }
        },
        {
          "match": {
            "ip": "230.70.230.60"
          }
        }
      ]
    }
  }
}


GET kibana_sample_data_logs/_search
{
  "query": {
    "bool": {
      "filter": [
        { "term": { "machine.os": "windows xp" }},
        { "term": { "ip": "230.70.230.60" }}
      ]
    }
  }
}


// Collapsing is selecting one document per collapsing key
// GET kibana_sample_data_logs/_search
// {
//   "query": {
//     "match": {
//       "machine.os": "ios"
//     }
//   },
//   "collapse": {
//     "field": "bytes"         
//   },
//   "sort": [
//     {
//       "machine.ram": { 
//         "order": "desc"
//       }
//     }
//   ],
//   "from": 0                    
// }

// Use query clauses in query context for conditions which should affect the score of matching documents (i.e. how well does the document match), and use all other query clauses in filter context.

//  Try must
GET kibana_sample_data_logs/_search
{
  "query": { 
    "bool": { 
      "must": [
        { "match": { "machine.os": "ios"        }},
        { "match": { "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css" }}
      ]
      // ,
      // "filter": [ 
      //   { },
      //   { }
      // ]
    }
  }
}

// Should will lower the score but does not filter like must
GET kibana_sample_data_logs/_search
{
  "query": { 
    "bool": { 
      "must": [
        { "match": { "machine.os": "ios"        }},
        { "match": { "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css" }}
      ],
    "should":[
      {"match": {"response":404}}
    ]  
    }
  }
}

// When we add response to must number of hits are decreased as expected
GET kibana_sample_data_logs/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "machine.os": "ios"
                    }
                },
                {
                    "match": {
                        "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css"
                    }
                },
                {
                    "match": {
                        "response": 404
                    }
                }
            ]
        }
    }
}

// Why scores are different? use ?explain parameter
GET kibana_sample_data_logs/_search?explain=true
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "machine.os": "ios"
                    }
                },
                {
                    "match": {
                        "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css"
                    }
                },
                {
                    "match": {
                        "response": 404
                    }
                }
                
            ]
        }
    }
}


GET kibana_sample_data_logs/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "machine.os": "ios"
                    }
                },
                {
                    "match": {
                        "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css"
                    }
                }
            ],
            "should": [
                {
                    "match": {
                        "response": 404
                    }
                }
            ],
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
}


// use geo filtering
GET kibana_sample_data_logs/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "machine.os": "ios"
                    }
                },
                {
                    "match": {
                        "url": "https://cdn.elastic-elastic-elastic.org/styles/ads.css"
                    }
                },
                {
                    "geo_shape": {
                      "geo.coordinates": {
                        "shape": {
                          "type": "Polygon",
                          "coordinates": [
                                          [
                                            [
                                              -85.5395508,
                                              30.2021137
                                            ],
                                            [
                                              -82.8588867,
                                              24.3671136
                                            ],
                                            [
                                              -80.1782227,
                                              24.8665025
                                            ],
                                            [
                                              -80.0463867,
                                              27.8196448
                                            ],
                                            [
                                              -81.3208008,
                                              30.7701591
                                            ],
                                            [
                                              -82.0458984,
                                              29.0561697
                                            ],
                                            [
                                              -85.5395508,
                                              30.2021137
                                            ]
                                          ]
                                        ]
                        },
                        "relation": "intersects"
                      }
                    }
                  }
                
            ]
        }
    }
}

