import streamlit as st

from utils import Role, write_message
from agent import generate_response

st.set_page_config(
    page_title="LLM Graph",
    page_icon="🧊",
)

st.write("# LLM Graph")

if "messages" not in st.session_state:
    st.session_state.messages = [
        {
            "role": Role.assistant.value,
            "content": "Hi, I'm a Graph Chatbot! How can I help you?",
        },
    ]


def handle_submit(message: str):
    with st.spinner("Thinking..."):
        response = generate_response(message)
        write_message(Role.assistant.value, response)


for message in st.session_state.messages:
    write_message(message["role"], message["content"], save=False)

if prompt := st.chat_input("What is up?"):
    write_message(Role.user.value, prompt)
    handle_submit(prompt)
