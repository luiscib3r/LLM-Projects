from langchain_community.graphs.neo4j_graph import Neo4jGraph
from langchain.chains.graph_qa.cypher import GraphCypherQAChain
from settings import settings
from llm import llm

graph = Neo4jGraph(
    uri=settings.NEO4J_URL,
    user=settings.NEO4J_USERNAME,
    password=settings.NEO4J_PASSWORD,
)

cypher_qa = GraphCypherQAChain.from_llm(
    llm,
    graph=graph,
)
