import streamlit as st
from enum import Enum


class Role(Enum):
    user = "user"
    assistant = "assistant"


def write_message(role: str, content: str, save: bool = True):
    if save:
        st.session_state.messages.append({"role": role, "content": content})

    with st.chat_message(role):
        st.markdown(content)
