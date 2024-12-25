document.addEventListener("click", ({ target }) => {
	if (target.dataset.type === "remove") {
		const id = target.dataset.id;
		remove(id).then(() => {
			target.closest("li").remove();
		});
	} else if (target.dataset.type === "edit") {
		const newTitle = prompt("Введите новое название", "");
		if (newTitle.trim().length) {
			const id = target.dataset.id;
			edit(id, newTitle).then(() => {
			target.closest("li").childNodes[0].textContent = newTitle
			})
		}
	}
});

function remove(id) {
	return fetch(`/${id}`, {
		method: "DELETE",
	});
}

function edit(id, title) {
	return fetch(`/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "Application/json; Charset=UTF-8",
		},
		body: JSON.stringify({ title }),
	});
}
