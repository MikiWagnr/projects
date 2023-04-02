import React, { useState, useEffect } from 'react';
import io from "socket.io-client"


const Chat = () => {
    const [approve, setApprove] = useState(false)
    const [username, setUsername] = useState("")
    const [input, setInput] = useState("")

    const [messages, setMessages] = useState([])

    const [socket] = useState(() => io(":8000"))

    useEffect(() => {
        console.log("is it working?")
        socket.on("post chat", (msg) => { setMessages(prevMsgState => [...prevMsgState, msg]) })
        return () => socket.removeAllListeners();
    }, [socket])

    const usernameHandler = (e) => {
        e.preventDefault()
        if (username) {
            setApprove(true)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        socket.emit("chat", { username: username, content: input })
        setInput("")
    }


    return (
        <div className='main'>
            <h1>React Social</h1>
            {
                !approve ?
                    <form onSubmit={usernameHandler}>
                        <label>Name:</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        <button>Join</button>
                    </form>
                    :

                    <div className="chatinput">
                        <div className='chats'>
                            <div className='card text-center'>
                                <div className='card-header'>
                                    <h1>welcome!</h1>
                                </div>
                                <div className='card-body'>
                                    {
                                        messages.map((msg, i) => (<p key={i}>{msg.username}: {msg.content} </p>))
                                    }
                                </div>

                                <form onSubmit={submitHandler}>
                                    <input type="text" value={input} onChange={e => setInput(e.target.value)} />
                                    <button>Send</button>
                                </form>

                            </div>
                        </div>


                    </div>
            }
        </div>
    );
};

export default Chat;