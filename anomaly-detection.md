## Introduction 

This document is created to summarize timeseries anomaly detection in ElasticSearch, OpenSearch and other tools.

[This link could be helpful to track all of the anomaly detection tools.](https://github.com/rob-med/awesome-TS-anomaly-detection)

### Elasticsearch

The algorithm used in elasticsearch is not known. However in the documentation they say, they are using: bespoke amalgamation of different techniques such as clustering, various types of time series decomposition, Bayesian distribution modeling, and correlation analysis.

Anomaly detection module uses some concepts to analyze and the data.
- **Jobs**: Configuration info of ml jobs.
- **Buckets**: Time interval that is used to analyze the data. If there are delays in your data it can be handled.
- **Bucket result**: Cobined anomaly score of a bucket. This evaluation made by information coming from previous buckets.They might indicate that at that time span server, website traffic is unsual.
-  **Infuluancers**: Possible suspects of anomaly. A person, username or ip adress.
-  **Calendars and events**: In some cases an anomaly is a normal thing for example black friday in e-commerce sites. Elasticsearch does not count that buckets as anomaly.
-  **Custom Rules**: Even though they are statistically significant and could be marked as an anomaly we are only interested in certain anomaly types. Custom rules help us to what to ignore.

To reach API Quick referance you could hop on to: https://www.elastic.co/guide/en/machine-learning/7.15/ml-api-quickref.html

The number of anomalies that ES ml stack could detect are listed below:

- Count: Number of entries
- Geographic Location
- Information Content: High or low information content.
- Metric (min max etc.)
- Rare: How rare a keyword occurs
- Sum
- Time of day - Time of week: Detects events that happen at unusual times

### Opensearch

Opensearch uses [Random Cut Forests](https://api.semanticscholar.org/CorpusID:927435) algorithm to detect anomlies. RCF is an unsupervised algorithm which calculates *anomaly grade* and *confidence score*.

Opensearch anomaly detection is similar with elasticsearch anomaly detection but limited in terms of number of anomalies it can detect. It can only detect average, count, sum, min, or max.

It also doesn't have custom rules, calendars and events.

### Skyline
Written in python. Uses 9 three-sigma based algorithms. A complex application system like airflow. Could be accessible from [link](https://github.com/earthgecko/skyline).

### Luminaire
Written by employees of Zillow. Anomaly detection on windows(buckets) and individual points. Written in python. Could be accessible from [link](https://github.com/zillow/luminaire). It is licanced under 

### Prophet
Facebook flagship time series module. Anomaly detection could be made with lower and upper bounds. 

### PyOD
A resourceful outlier detection library. Disadvantage of this package is it is not based on time series. However, it contains many calssic and/or SOTA outlier detection algorithms. Could be accessible from [link](https://github.com/yzhao062/pyod).