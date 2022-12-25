const teams = document.querySelectorAll('.TEAM');

for (let team of teams) {
    const txt_link = team.lastElementChild.firstElementChild;
    const btn_cpy = team.lastElementChild.lastElementChild;
    txt_link.addEventListener('focus', () => {
        txt_link.select();
    })
    btn_cpy.addEventListener('click', () => {
        navigator.clipboard.writeText(txt_link.value);
    })
}