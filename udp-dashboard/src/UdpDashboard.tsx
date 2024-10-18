import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Configura a conexão com o servidor socket.io
const socket = io('http://localhost:3001');

const UdpDashboard: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Ouve por novas mensagens UDP
    socket.on('udp-message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Limpa o listener quando o componente é desmontado
    return () => {
      socket.off('udp-message');
    };
  }, []);

  // Transforma as mensagens em dados para o gráfico
  const data = messages.map((msg, index) => ({
    name: `Message ${index + 1}`,
    value: parseInt(msg, 10),
  }));

  return (
    <div>
      <h1>UDP Dashboard</h1>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default UdpDashboard;
