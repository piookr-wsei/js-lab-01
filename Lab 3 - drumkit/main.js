document.addEventListener('DOMContentLoaded', () => {
    const sounds = {
        'a': 'sounds/clap.wav',
        's': 'sounds/hihat.wav',
        'd': 'sounds/kick.wav',
        'f': 'sounds/openhat.wav',
        'g': 'sounds/boom.wav',
        'h': 'sounds/ride.wav',
        'j': 'sounds/snare.wav',
        'k': 'sounds/tom.wav',
        'l': 'sounds/tink.wav',
        'metronome': 'sounds/hihat.wav'
    };

    const channels = [[], [], [], []];
    let isRecording = [false, false, false, false];
    let startTime = [0, 0, 0, 0];
    let metronomeInterval = null;

    document.addEventListener('keydown', (e) => {
        if (sounds[e.key]) {
            const audio = new Audio(sounds[e.key]);
            audio.play();
            const button = document.querySelector(`.sound[data-key="${e.key}"]`);
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 200);

            channels.forEach((channel, index) => {
                if (isRecording[index]) {
                    const time = Date.now() - startTime[index];
                    channel.push({ key: e.key, time });
                }
            });
        }
    });

    const recordButtons = document.querySelectorAll('.record');
    recordButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            isRecording[index] = true;
            channels[index] = [];
            startTime[index] = Date.now();
        });
    });

    const playButtons = document.querySelectorAll('.play');
    playButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            channels[index].forEach(note => {
                setTimeout(() => {
                    const audio = new Audio(sounds[note.key]);
                    audio.play();
                }, note.time);
            });
        });
    });

    // Odtwarzanie wybranych kanałów
    document.querySelector('.play-selected').addEventListener('click', () => {
        const selectedChannels = getSelectedChannels();
        selectedChannels.forEach(index => {
            channels[index].forEach(note => {
                setTimeout(() => {
                    const audio = new Audio(sounds[note.key]);
                    audio.play();
                }, note.time);
            });
        });
    });

    // Przełączanie metronomu
    document.querySelector('.metronome-toggle').addEventListener('click', () => {
        if (metronomeInterval) {
            clearInterval(metronomeInterval);
            metronomeInterval = null;
        } else {
            const bpm = parseInt(document.querySelector('.metronome-bpm').value, 10);
            const intervalTime = 60000 / bpm;
            metronomeInterval = setInterval(() => {
                const audio = new Audio(sounds['metronome']);
                audio.play();
            }, intervalTime);
        }
    });

    // Odtwarzanie dźwięków
    document.querySelectorAll('.sound').forEach(button => {
        button.addEventListener('click', function() {
            const key = this.getAttribute('data-key');
            const audio = new Audio(sounds[key]);
            audio.play();
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 200);
        });
    });
});

// Funkcja do pobierania indeksów wybranych kanałów
function getSelectedChannels() {
    const selectedChannels = [];
    ['channel0', 'channel1', 'channel2', 'channel3'].forEach((id, index) => {
        if (document.getElementById(id).checked) {
            selectedChannels.push(index);
        }
    });
    return selectedChannels;
}