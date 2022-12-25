const characters_json = async() => (await fetch('../json/character.json')).json();

function banned_or_selected(event) {
    const evt = event.currentTarget;
    const btns = this.parentElement.children;
    for (const btn of btns) {
        if (!btn.classList.contains('selected')) {
            btn.classList.remove('grayscale');
        }
    }
    selects.delete(lastSelect)

    this.classList.add('grayscale');
    if (this.classList.contains('grayscale')) {
        selects.add(this.firstChild.title);
        lastSelect = this.firstChild.title;
    }
    console.log(selects);
    if (evt.isBan) {
        evt.elm.setAttribute('src', `../img/character/${evt.character.img_pf}`);
    } else {
        evt.elm.style.backgroundImage = `url("../img/character_bg/${evt.character.img_bg}")`; 
    }
}

let step = 0;
const orders = [
                { status: first_ban, isBan: true }, { status: second_ban, isBan: true }, 
                { status: first_ban2, isBan: true }, { status: second_ban2, isBan: true },
                { status: first_pick, isBan: false },{ status: first_pick2, isBan: false },
                { status: second_pick2, isBan: false}, { status: second_pick, isBan: false },
                { status: third_ban2, isBan: true }, { status: fourth_ban2, isBan: true },
                { status: third_ban, isBan: true }, { status: fourth_ban, isBan: true },
                { status: third_pick2, isBan: false }, { status: third_pick, isBan: false },
                { status: fourth_pick, isBan: false }, { status: fourth_pick2, isBan: false },
                { status: fifth_ban, isBan: true }, { status: fifth_ban2, isBan: true },
                { status: fifth_pick, isBan: false }, { status: fifth_pick2, isBan: false }
            ];
let selects = new Set();
let lastSelect;

const data = async (pos) => {
    character_panel.innerHTML = '';

    const characters = (await characters_json()).character;

    characters.forEach(character => {
        if (pos === undefined || character.position.includes(pos)) {
            const btn = document.createElement('button');
            const img = document.createElement('img');
            img.setAttribute('title', character.name);
            img.setAttribute('alt', character.name);
            img.setAttribute('src', `../img/character/${character.img_pf}`);
            img.classList.add('border-2', 'sm:border-4', 'border-black', 'w-full');
            btn.appendChild(img);
            if (selects.has(character.name)) {
                btn.classList.add('grayscale', 'selected');
                btn.disabled = true;
            }
            if (character.name == lastSelect) {
                btn.classList.remove('selected');
            }
            character_panel.appendChild(btn);
            
            btn.addEventListener('click', banned_or_selected);
            btn.character = character;
            btn.elm = orders[step].status;
            btn.isBan = orders[step].isBan;
        }
    });
}

const filter_menu = (obj, pos) => {
    const selecetd = obj.classList.contains('filterhero-active');
    const menus = obj.parentElement.children;
    for (let menu of menus) {
        menu === obj && !selecetd ? menu.classList.add('filterhero-active') : menu.classList.remove('filterhero-active');
    }
    selecetd ? data() : data(pos);
};

data();

assassin.addEventListener('click', function () {
    filter_menu(this, 'assassin');
});

mage.addEventListener('click', function () {
    filter_menu(this, 'mage');
});

fighter.addEventListener('click', function () {
    filter_menu(this, 'fighter');
});

carry.addEventListener('click', function () {
    filter_menu(carry, 'carry');
});

tank.addEventListener('click', function () {
    filter_menu(this, 'tank');
});

support.addEventListener('click', function () {
    filter_menu(this, 'support');
});

btn_lock.addEventListener('click', () => {
    const btns = character_panel.children;
    step++;
    for (const btn of btns) {
        if (step < orders.length) {
            btn.elm = orders[step].status;
            btn.isBan = orders[step].isBan;
        }
        if (btn.classList.contains('grayscale')) {
            btn.classList.add('selected');
            btn.disabled = true;
        }
    }
    lastSelect = '';
});