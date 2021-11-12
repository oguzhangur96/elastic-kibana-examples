// Each document is a collection of fields and elasticsearch does mapping automatically if not defined by templates or explicitly.

// Defining too many fields in an index could make mapping explosion. So be careful when adding mappings on new fields. 

// https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html#mapping-limit-settings

// If there is no configuration, elasticsearch creates mappings dynamically.
// Creates index named data and adds one document with field count.
PUT data/_doc/1 
{ "count": 5 }

// you could llok up to all rules in here
// https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-field-mapping.html

// Elasticsearch automatically maps string fields which contains number and date
PUT my-index-000001/_doc/1
{
  "create_date": "2015/09/02"
}

GET my-index-000001/_mapping

// you could disable those mappings but first you need to delete the index
DELETE my-index-000001

PUT my-index-000001
{
  "mappings": {
    "date_detection": false
  }
}

PUT my-index-000001/_doc/1 
{
  "create": "2015/09/02"
}

GET my-index-000001/_mapping

// you could also add or specify the date mappings you wish to use
DELETE my-index-000001

// seems elasticsearch does not support multiple formats. First inserted will be the dominant format!
PUT my-index-000001
{
  "mappings": {
    "dynamic_date_formats": ["MM/dd/yyyy","yyyy-MM-dd"]
  }
}

PUT my-index-000001/_doc/1 
{
  "create": "12/25/2050"
}

PUT my-index-000001/_doc/2 
{
  "create": "2021-12-22"
}

// Elasticsearch also supports dynamic numeric mapping but it is set to false by default
// Lets enable it. First update the mapping api.
DELETE my-index-000001

PUT my-index-000001
{
  "mappings": {
    "numeric_detection": true
  }
}

PUT my-index-000001/_doc/1
{
  "my_float":   "1.0", 
  "my_integer": "1" 
}

//  my_float is float and my_integer is long
GET my-index-000001/_mapping

// I will pass the dynamic templates and get going with explicit mapping.
// You could read dynamic templates on:
// https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-templates.html

DELETE my-index-000001

// We know our data. We could do this explicit mapping
PUT my-index-000001
{
  "mappings": {
    "properties": {
      "age":    { "type": "integer" },  
      "email":  { "type": "keyword"  }, 
      "name":   { "type": "text"  }     
    }
  }
}

PUT my-index-000001/_mapping
{
  "properties": {
    "employee-id": {
      "type": "keyword",
      "index": false
    }
  }
}

GET my-index-000001/_mapping

// View the mapping of specific field
GET my-index-000001/_mapping/field/name


