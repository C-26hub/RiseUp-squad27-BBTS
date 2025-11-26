// Logo Upload
const logoSection = document.getElementById('logoSection');
const logoInput = document.getElementById('logoInput');

logoSection.addEventListener('click', () => {
    logoInput.click();
});

logoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            logoSection.innerHTML = `<img src="${event.target.result}" style="max-width: 100%; max-height: 100px; object-fit: contain;">`;
        };
        reader.readAsDataURL(file);
    }
});

// Color Pickers
for (let i = 1; i <= 3; i++) {
    const preview = document.getElementById(`colorPreview${i}`);
    const input = document.getElementById(`colorInput${i}`);
    const picker = document.getElementById(`colorPicker${i}`);

    preview.addEventListener('click', () => {
        picker.click();
    });

    picker.addEventListener('input', (e) => {
        const color = e.target.value;
        preview.style.backgroundColor = color;
        input.value = color.toUpperCase();
    });

    input.addEventListener('input', (e) => {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            preview.style.backgroundColor = color;
            picker.value = color;
        }
    });
}

// Font Selection
const fontSelect = document.getElementById('fontSelect');
fontSelect.addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value + ", sans-serif";
});

// Action Buttons
document.querySelector('.btn-check').addEventListener('click', () => {
    const config = {
        logo: logoSection.innerHTML,
        corPrincipal: document.getElementById('colorInput1').value,
        corSecundaria: document.getElementById('colorInput2').value,
        corFundo: document.getElementById('colorInput3').value,
        tipografia: fontSelect.value
    };
    
    console.log('Configurações salvas:', config);
    alert('Configurações salvas com sucesso!');
});

document.querySelector('.btn-add').addEventListener('click', () => {
    alert('Funcionalidade de adicionar');
});

document.querySelector('.btn-edit').addEventListener('click', () => {
    alert('Funcionalidade de editar');
});

// Menu interactions
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('Menu clicado:', item.textContent);
    });
});

const submenuItems = document.querySelectorAll('.submenu-item');
submenuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        submenuItems.forEach(sub => sub.classList.remove('active'));
        item.classList.add('active');
        console.log('Submenu clicado:', item.textContent);
    });
});