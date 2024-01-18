const socket = io("ws://localhost:3000");

const enter = document.getElementById("enter");

enter.onsubmit = (e) => {
	e.preventDefault();

	const text = document.getElementById("name").value;
	document.getElementById("name").value = "";
	socket.emit("enter", text);
	enter.remove();
};

socket.on("enter", (text) => {
	const el = document.createElement("li");
	el.innerHTML = text;
	el.className = "flex justify-center text-gray-300 my-2";
	document.querySelector("ul").appendChild(el);
});

socket.on("message", (text) => {
	const el = document.createElement("li");
	el.innerHTML = text;
	document.querySelector("ul").appendChild(el);
});

const button = document.getElementById("message");

button.onsubmit = (e) => {
	e.preventDefault();
	const text = document.getElementById("messageInp").value;
	document.getElementById("messageInp").value = "";
	socket.emit("message", text);
};
