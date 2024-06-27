// document.addEventListener('DOMContentLoaded', () => {
//   const registerFormContainer = document.querySelector('#register-form-container');
//   const loginFormContainer = document.querySelector('#login-form-container');
//   const chatContainer = document.querySelector('#chat-container');
//   const chatForm = document.querySelector('#chat-form');
//   const chatHistory = document.querySelector('#chat-history');

//   document.querySelector('#show-register-link').addEventListener('click', (event) => {
//       event.preventDefault();
//       loginFormContainer.style.display = 'none';
//       registerFormContainer.style.display = 'block';
//   });

//   document.querySelector('#show-login-link').addEventListener('click', (event) => {
//       event.preventDefault();
//       registerFormContainer.style.display = 'none';
//       loginFormContainer.style.display = 'block';
//   });

//   const showAuth = () => {
//       document.querySelector('#auth-container').style.display = 'flex';
//       chatContainer.style.display = 'none';
//   };

//   const hideAuth = () => {
//       document.querySelector('#auth-container').style.display = 'none';
//       chatContainer.style.display = 'flex';
//   };

//   const loadContacts = async () => {
//       const contactsList = document.querySelector('.contacts-list');
//       contactsList.innerHTML = ''; // Clear existing contacts
//       const contacts = ['John Doe', 'Jane Smith', 'Bob Johnson'];
//       contacts.forEach(contact => {
//           const contactElement = document.createElement('div');
//           contactElement.textContent = contact;
//           contactsList.appendChild(contactElement);
//       });
//   };

//   const registerUser = async (event) => {
//       event.preventDefault();
//       const username = document.querySelector('#register-username').value;
//       const email = document.querySelector('#register-email').value;
//       const password = document.querySelector('#register-password').value;

//       try {
//           const response = await fetch('http://localhost:3000/api/auth/register', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ username, email, password })
//           });

//           const data = await response.json();
//           if (response.ok) {
//               alert('Registration successful');
//               document.querySelector('#register-form').reset();
//               document.querySelector('#show-login-link').click();
//           } else {
//               alert(data.error);
//           }
//       } catch (error) {
//           console.error('Error registering user:', error);
//           alert('An error occurred during registration');
//       }
//   };

//   const loginUser = async (event) => {
//       event.preventDefault();
//       const email = document.querySelector('#login-email').value;
//       const password = document.querySelector('#login-password').value;

//       try {
//           const response = await fetch('http://localhost:3000/api/auth/login', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ email, password })
//           });

//           const data = await response.json();
//           if (response.ok) {
//               localStorage.setItem('token', data.token);
//               hideAuth();
//               chatForm.style.display = 'flex';
//               connectWebSocket();
//           } else {
//               alert(data.error);
//           }
//       } catch (error) {
//           console.error('Error logging in user:', error);
//           alert('An error occurred during login');
//       }
//   };

//   const sendMessage = (event) => {
//       event.preventDefault();
//       const input = document.querySelector('#chat-input');
//       const message = input.value;
//       if (socket && socket.readyState === WebSocket.OPEN) {
//           socket.send(JSON.stringify({ type: 'message', text: message }));
//           input.value = '';
//       } else {
//           console.error('WebSocket is not open. Ready state:', socket.readyState);
//       }
//   };

//   let socket;

//   const connectWebSocket = () => {
//       if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
//           return;
//       }

//       const token = localStorage.getItem('token');
//       socket = new WebSocket(`ws://localhost:3000/?token=${token}`);

//       socket.onopen = () => {
//           console.log('WebSocket connection opened');
//       };

//       socket.onmessage = (event) => {
//           const data = JSON.parse(event.data);
//           displayMessage(data);
//       };

//       socket.onclose = () => {
//           console.log('WebSocket connection closed. Attempting to reconnect...');
//           setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
//       };

//       socket.onerror = (error) => {
//           console.error('WebSocket error:', error);
//       };
//   };

//   // const displayMessage = ({ text, timestamp, userId }) => {
//   //     const messageElement = document.createElement('div');
//   //     messageElement.classList.add('message');
//   //     messageElement.textContent = `[${new Date(timestamp).toLocaleTimeString()}] User: ${text}`;
//   //     chatHistory.appendChild(messageElement);
//   //     chatHistory.scrollTop = chatHistory.scrollHeight;
//   // };


//   const displayMessage = (message) => {
//     const messageElement = document.createElement('div');
//     messageElement.classList.add('message');

//     if (message.userId === 'me') {
//         messageElement.classList.add('sent');
//     } else {
//         messageElement.classList.add('received');
//     }

//     const messageContent = document.createElement('div');
//     messageContent.classList.add('message-content');
//     messageContent.textContent = message.text;

//     const messageTime = document.createElement('div');
//     messageTime.classList.add('message-time');
//     messageTime.textContent = new Date(message.timestamp).toLocaleTimeString();

//     messageElement.appendChild(messageContent);
//     messageElement.appendChild(messageTime);
//     chatHistory.appendChild(messageElement);
//     chatHistory.scrollTop = chatHistory.scrollHeight;
// };

//   document.querySelector('#register-form').addEventListener('submit', registerUser);
//   document.querySelector('#login-form').addEventListener('submit', loginUser);
//   document.querySelector('#chat-form').addEventListener('submit', sendMessage);

//   showAuth();
//   loadContacts();
// });


document.addEventListener('DOMContentLoaded', () => {
  const registerFormContainer = document.querySelector('#register-form-container');
  const loginFormContainer = document.querySelector('#login-form-container');
  const chatContainer = document.querySelector('#chat-container');
  const chatForm = document.querySelector('#chat-form');
  const chatHistory = document.querySelector('#chat-history');

  document.querySelector('#show-register-link').addEventListener('click', (event) => {
      event.preventDefault();
      loginFormContainer.style.display = 'none';
      registerFormContainer.style.display = 'block';
  });

  document.querySelector('#show-login-link').addEventListener('click', (event) => {
      event.preventDefault();
      registerFormContainer.style.display = 'none';
      loginFormContainer.style.display = 'block';
  });

  const showAuth = () => {
      document.querySelector('#auth-container').style.display = 'flex';
      chatContainer.style.display = 'none';
  };

  const hideAuth = () => {
      document.querySelector('#auth-container').style.display = 'none';
      chatContainer.style.display = 'flex';
  };

  const loadContacts = async () => {
      const contactsList = document.querySelector('.contacts-list');
      contactsList.innerHTML = ''; // Clear existing contacts
      const contacts = ['John Doe', 'Jane Smith', 'Bob Johnson'];
      contacts.forEach(contact => {
          const contactElement = document.createElement('div');
          contactElement.textContent = contact;
          contactsList.appendChild(contactElement);
      });
  };

  const registerUser = async (event) => {
      event.preventDefault();
      const username = document.querySelector('#register-username').value;
      const email = document.querySelector('#register-email').value;
      const password = document.querySelector('#register-password').value;

      try {
          const response = await fetch('http://localhost:3000/api/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, email, password })
          });

          const data = await response.json();
          if (response.ok) {
              alert('Registration successful');
              document.querySelector('#register-form').reset();
              document.querySelector('#show-login-link').click();
          } else {
              alert(data.error);
          }
      } catch (error) {
          console.error('Error registering user:', error);
          alert('An error occurred during registration');
      }
  };

  const loginUser = async (event) => {
      event.preventDefault();
      const email = document.querySelector('#login-email').value;
      const password = document.querySelector('#login-password').value;

      try {
          const response = await fetch('http://localhost:3000/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
          });

          const data = await response.json();
          if (response.ok) {
              localStorage.setItem('token', data.token);
              hideAuth();
              chatForm.style.display = 'flex';
              connectWebSocket();
          } else {
              alert(data.error);
          }
      } catch (error) {
          console.error('Error logging in user:', error);
          alert('An error occurred during login');
      }
  };

  const sendMessage = (event) => {
      event.preventDefault();
      const input = document.querySelector('#chat-input');
      const message = input.value;
      if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'message', text: message }));
          input.value = '';
      } else {
          console.error('WebSocket is not open. Ready state:', socket.readyState);
      }
  };

  let socket;

  const connectWebSocket = () => {
      if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
          return;
      }

      const token = localStorage.getItem('token');
      socket = new WebSocket(`ws://localhost:3000/?token=${token}`);

      socket.onopen = () => {
          console.log('WebSocket connection opened');
      };

      socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          displayMessage(data);
      };

      socket.onclose = () => {
          console.log('WebSocket connection closed. Attempting to reconnect...');
          setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
      };

      socket.onerror = (error) => {
          console.error('WebSocket error:', error);
      };
  };

  const displayMessage = (message) => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');

      if (message.userId === 'me') {
          messageElement.classList.add('sent');
      } else {
          messageElement.classList.add('received');
      }

      const messageContent = document.createElement('div');
      messageContent.classList.add('message-content');
      messageContent.textContent = message.text;

      const messageTime = document.createElement('div');
      messageTime.classList.add('message-time');
      messageTime.textContent = new Date(message.timestamp).toLocaleTimeString();

      messageElement.appendChild(messageContent);
      messageElement.appendChild(messageTime);
      chatHistory.appendChild(messageElement);
      chatHistory.scrollTop = chatHistory.scrollHeight;
  };

  document.querySelector('#register-form').addEventListener('submit', registerUser);
  document.querySelector('#login-form').addEventListener('submit', loginUser);
  document.querySelector('#chat-form').addEventListener('submit', sendMessage);

  showAuth();
  loadContacts();
});






  