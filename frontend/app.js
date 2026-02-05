const API_URL = "https://abc123.execute-api.eu-west-1.amazonaws.com/messages";

async function loadMessages() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(m => {
    const li = document.createElement("li");
    li.innerText = m.text;
    list.appendChild(li);
  });
}

async function sendMessage() {
  const text = document.getElementById("msg").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  loadMessages();
}

loadMessages();
