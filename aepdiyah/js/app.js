const audio = (() => {
    let instance;

    let getInstance = function () {
        if (!instance) {
            let url = document.getElementById('tombol-musik').getAttribute('data-url').toString();
            instance = new Audio(url);
        }

        return instance;
    };

    return {
        play: function () {
            getInstance().play();
        },
        pause: function () {
            getInstance().pause();
        }
    };
})();

const salin = (btn) => {
    navigator.clipboard.writeText(btn.getAttribute('data-nomer').toString());
    let tmp = btn.innerHTML;
    btn.innerHTML = 'Tersalin';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = tmp;
        btn.disabled = false;
    }, 1500);
};

const timer = () => {
    let tanggal = document.getElementById('tampilan-waktu').getAttribute('data-waktu').toString();
    let countDownDate = new Date(tanggal).getTime();
    let time = null;

    time = setInterval(() => {
        let distance = countDownDate - (new Date().getTime());

        if (distance < 0) {
            clearInterval(time);
            return false;
        }

        document.getElementById('hari').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById('jam').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('menit').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('detik').innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
};

const buka = async () => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('tombol-musik').style.display = 'block';
    AOS.init();
    timer();
    audio.play();
};

const play = (btn) => {
    let isPlay = btn.getAttribute('data-status').toString() == 'true';

    if (!isPlay) {
        btn.setAttribute('data-status', 'true');
        audio.play();
        btn.innerHTML = '<i class="ai-pause" style="font-size: 18px; color: WHITE"></i>';
    } else {
        btn.setAttribute('data-status', 'false');
        audio.pause();
        btn.innerHTML = '<i class="ai-play" style="font-size: 18px; color: WHITE"></i>';
    }
};



document.addEventListener('DOMContentLoaded', () => {
    let modal = new bootstrap.Modal('#exampleModal');
    let name = (new URLSearchParams(window.location.search)).get('to') ?? '';

    if (name.length == 0) {
        document.getElementById('namatamu').remove();
    } else {
        name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        let div = document.createElement('div');
        div.classList.add('m-2');
        div.innerHTML = `
        <h2 class="fsub1 text-dark">${name}</h2>
        `;

        document.getElementById('namatamu').appendChild(div);
    }

    modal.show();
});


   const scriptURL = 'https://script.google.com/macros/s/AKfycbykKD9poWwHt5MXiH7jApQSZMcSSnlXacJwH7Vie8VMzZmtkahWbLc_FciTcj8FCdqY/exec'
   const form = document.forms['submit-to-google-sheet']
   const btnKirim = document.querySelector('.btn-kirim');
   const btnLoading = document.querySelector('.btn-loading');
   const myAlert = document.querySelector('.my-alert');
   
   
   
   form.addEventListener('submit', (e) => {
   e.preventDefault();
   // ketika tombol submit diklik
   // tampilkan tombol loading, hilangkan tombol kirim
   btnLoading.classList.toggle('d-none');
   
   
   btnKirim.classList.toggle('d-none');
   fetch(scriptURL, { method: 'POST', body: new FormData(form) })
   
   
   .then((response) => {
   // tampilkan tombol kirim, hilangkan tombol loading
   btnLoading.classList.toggle('d-none');
   btnKirim.classList.toggle('d-none');
   // tampilkan alert
   myAlert.classList.toggle('d-none');
   // reset formnya
   form.reset();
   console.log('Success!', response);
   })
   
   
   
   .catch((error) => console.error('Error!', error.message));
   });
   
   //time pesan
 