const webservice = "http://localhost:3000"

async function cadastrar() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
  
    // Verifica se os campos estão preenchidos
    if (!email || !password || !username) {
      alert("Preencha todos os campos!");
      return;
    }
  
    try {
      const response = await fetch( webservice+"/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "./login.html"; // Redireciona para a página de login
      } else {
        alert("Erro ao cadastrar: " + data.error); // Exibe o erro retornado pelo servidor
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar. Verifique o console para mais detalhes.");
    }
  }
      
async function login() {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        try {
          const response = await fetch(webservice+"/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            // Armazena o token no localStorage
            localStorage.setItem("authToken", data.token);
            console.log("Token armazenado no localStorage:", data.token);
            alert("Logado com sucesso")

            window.location.href = "./index.html";
          } else {
            console.error("Erro no login:", data.error);
          }
        } catch (error) {
          console.error("Erro ao fazer login:", error);
        }
      }

async function verificarToken() {
        const token = localStorage.getItem("authToken"); // Corrigido para "authToken"
        console.log("Token encontrado:", token);
      
        if (!token) {
          console.error("Token não encontrado no localStorage.");
          return;
        }
      
        try {
          const response = await fetch(webservice + "/dados", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log("Dados recebidos do servidor:", data);

      
            if (window.location.pathname.includes("index.html")) {
              document.getElementById("username").innerText = `${data.username}`;
              const cadastrarbtn = document.getElementById("cadastro")
              cadastrarbtn.remove()
              const logarbnt = document.getElementById("logar")
              logarbnt.remove()

            }
          } else {
            console.error("Erro na requisição:", response.statusText);
          }
        } catch (err) {
          console.error("Erro ao verificar token:", err);
        }
      }


window.onload = verificarToken;
