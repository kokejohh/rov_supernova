const characters_json = async() => (await fetch('../json/character.json')).json();

function banned_or_selected(event) {
    const evt = event.currentTarget;
    const btns = this.parentElement.children;
    for (const btn of btns) {
        const img_class = btn.firstElementChild.classList;
        if (!btn.classList.contains('selected')) {
            img_class.remove('grayscale');
            btn.disabled = false;
        }
    }
    
    this.disabled = true;
    this.firstChild.classList.add('grayscale');
    selects.delete(lastSelect);
    lastSelect = this.firstChild.title;
    selects.add(lastSelect);

    ((!evt.elm.id.match('2') && evt.character.look === 'left') ||
        (evt.elm.id.match('2') && evt.character.look === 'right')) ?
            evt.elm.classList.add('-scale-x-100') : evt.elm.classList.remove('-scale-x-100');

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
            img.classList.add('border', 'border-0.5', 'sm:border-2', 'border-slate-900', 'w-full');
            
            btn.appendChild(img);

            btn.classList.add('relative');
   
            if (selects.has(character.name)) {
                btn.firstElementChild.classList.add('grayscale');
                btn.classList.add('selected');
                const img_disabled = document.createElement('img');
                img_disabled.setAttribute('src', "../img/disable.png");
                img_disabled.classList.add('absolute', 'inset-y-0', 'left-0', 'w-full');
                btn.appendChild(img_disabled);
                btn.disabled = true;
            }
            if (character.name == lastSelect) {
                btn.classList.remove('selected');
                btn.removeChild(btn.lastElementChild);
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
        if (btn.firstElementChild.classList.contains('grayscale')) {
            if (btn.childElementCount === 1) {
                const img_disabled = document.createElement('img');
                img_disabled.setAttribute('src', "../img/disable.png");
                img_disabled.classList.add('absolute', 'inset-y-0', 'left-0', 'w-full');
                btn.appendChild(img_disabled);
                
                btn.classList.add('selected');
                btn.disabled = true;
            }
        }
    }
    lastSelect = '';
});