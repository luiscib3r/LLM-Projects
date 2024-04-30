from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain.agents import AgentExecutor, create_react_agent
from langchain import hub
from langchain.tools import Tool
from llm import llm
from graph import cypher_qa

tools = [
    Tool.from_function(
        name="General Chat",
        description="For general chat not covered by other tools",
        func=llm.invoke,
        return_direct=True,
    ),
    Tool.from_function(
        name="Graph Cypher QA Chain",
        description="Answer questions using Cypher queries on a graph database",
        func=cypher_qa,
        return_direct=True,
    ),
]

memory = ConversationBufferWindowMemory(
    memory_key="chat_history",
    k=5,
    return_messages=True,
)

agent_prompt = hub.pull("hwchase17/react-chat")
agent = create_react_agent(llm, tools, agent_prompt)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    memory=memory,
    verbose=True,
)


def generate_response(prompt):
    response = agent_executor.invoke({"input": prompt})

    return response["output"]
