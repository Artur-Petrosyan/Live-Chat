import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import { useSocketSendAndGetMessages } from "../hooks/useSocketSendAndGetMessages";

const ChatWindow = () => {
		const {messages, sendMessage} = useSocketSendAndGetMessages();

		const [input, setInput] = useState('');

		const handleSend = () => {
				if (input.trim()) {
						sendMessage(input);
						setInput('');
				}
		};

		return (
					<div style={{ maxWidth: 600, margin: '2rem auto' }}>
							<List
										size="small"
										bordered
										dataSource={messages}
										renderItem={(msg, i) => <List.Item key={i}>{msg}</List.Item>}
										style={{ marginBottom: '1rem', height: '300px', overflowY: 'scroll' }}
							/>
							<Input.Group compact>
									<Input
												style={{ width: '80%' }}
												value={input}
												onChange={(e) => setInput(e.target.value)}
												onPressEnter={handleSend}
									/>
									<Button type="primary" onClick={handleSend}>
											Send
									</Button>
							</Input.Group>
					</div>
		);
};

export default ChatWindow;