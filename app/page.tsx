
"use client";

import { useRef, useState } from "react";


const basePath =
  process.env.NODE_ENV === "production" ? "/happybirthday" : "";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];


const questions = [
  {
    emoji: "💑",
    title: "Our Little Love Story",
    subtitle: "Let's see what your heart says, my love...",
    question: "What does our relationship mean to you?",
    answers: [
      "You're my favourite person ❤️",
      "A beautiful part of my life 🫶🏻",
      "A love story I want to keep writing 💗",
    ],
  },
  {
    emoji: "🥹",
    title: "A Little Question From My Heart",
    subtitle: "Be honest with me, Amarah...",
    question: "When we fight, what do you want us to remember?",
    answers: [
      "That we love each other ❤️",
      "That we should listen and understand 🫂",
      "That our love matters more than our anger 💞",
    ],
  },
  {
    emoji: "💍",
    title: "One Last Question, My Love",
    subtitle: "This one means a lot to me...",
    question: "What would you choose for our future together?",
    answers: [
      "More love, trust, and respect 💗",
      "Growing together through every challenge 🫶🏻",
      "Making beautiful memories for years to come 🌹",
    ],
  },
];


const photos = [
  {
    src: `${basePath}/images/photo-1.jpg`,
    alt: "A special memory",

  },
  {
    src: `${basePath}/images/photo-2.jpg`,
    alt: "A beautiful moment",
  },
  {
    src: `${basePath}/images/photo-3.jpg`,
    alt: "A treasured memory",
  },
  {
    src: `${basePath}/images/photo-4.jpg`,
    alt: "A memory close to my heart",
  },
];

const confettiPieces = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${(i % 9) * 0.23}s`,
  duration: `${3 + (i % 5) * 0.6}s`,
  color: [
    "#f4a6c5",
    "#d85e93",
    "#f5d6a0",
    "#c7a6e8",
    "#ffffff",
  ][i % 5],
}));

export default function Home() {
  const [birthdayMonth, setBirthdayMonth] = useState("");
  const [birthdayDay, setBirthdayDay] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const [musicOn, setMusicOn] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const daysInMonth = birthdayMonth
    ? new Date(2000, Number(birthdayMonth), 0).getDate()
    : 31;


  function startQuestions() {
    if (!birthdayMonth || !birthdayDay) {
      alert("Choose your special day first, Amarah ❤️");
      return;
    }

    if (birthdayMonth !== "10" || birthdayDay !== "20") {
      alert("Notwana sahi date lekh ❤️");
      setBirthdayMonth("");
      setBirthdayDay("");
      return;
    }

    setAnswers([]);
    setSelected(null);
    setStep(1);
  }


  function nextQuestion() {
    if (selected === null) return;

    const updatedAnswers = [...answers];
    updatedAnswers[step - 1] = questions[step - 1].answers[selected];

    setAnswers(updatedAnswers);
    setSelected(null);
    setStep(step + 1);
  }

  async function openBirthdaySurprise() {
    setStep(5);
    setMusicError(false);

    const audio = audioRef.current;

    if (!audio) {
      setMusicError(true);
      return;
    }

    try {
      audio.volume = 0.45;
      await audio.play();
      setMusicOn(true);
    } catch {
      setMusicOn(false);
      setMusicError(true);
    }
  }

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) {
      setMusicError(true);
      return;
    }

    if (audio.paused) {
      try {
        audio.volume = 0.45;
        await audio.play();
        setMusicOn(true);
        setMusicError(false);
      } catch {
        setMusicOn(false);
        setMusicError(true);
      }
    } else {
      audio.pause();
      setMusicOn(false);
      setMusicError(false);
    }
  }

  const currentQuestion = questions[step - 1];

  return (
    <main className="birthday-page">
      <audio
        ref={audioRef}
        src={`${basePath}/music/birthday-song.mp3`}
        loop
        preload="auto"
      />

      <div className="floating-heart heart-one" aria-hidden="true">♥</div>
      <div className="floating-heart heart-two" aria-hidden="true">♡</div>
      <div className="floating-heart heart-three" aria-hidden="true">♥</div>
      <div className="floating-heart heart-four" aria-hidden="true">♡</div>

      {step === 5 && (
        <div className="confetti-layer" aria-hidden="true">
          {confettiPieces.map((piece) => (
            <span
              key={piece.id}
              className="confetti-piece"
              style={{
                left: piece.left,
                animationDelay: piece.delay,
                animationDuration: piece.duration,
                backgroundColor: piece.color,
              }}
            />
          ))}
        </div>
      )}

      <section className="birthday-card" key={step}>
        {step === 0 && (
          <>
            <div className="rose">🌹</div>

            <p className="eyebrow">
              A LITTLE SURPRISE FOR SOMEONE SPECIAL
            </p>

            <h1>
              Hey, Amarah <span>♡</span>
            </h1>

            <p className="subtitle">
              Every beautiful story has a special day.
              <br />
              Tell me yours, and let the magic begin...
            </p>

            <div className="divider">✧ ── ♡ ── ✧</div>

            <div className="birthday-date-picker">
              <div>
                <label htmlFor="birthday-month">Birthday month 🌷</label>

                <select
                  id="birthday-month"
                  value={birthdayMonth}
                  onChange={(e) => {
                    setBirthdayMonth(e.target.value);
                    setBirthdayDay("");
                  }}
                >
                  <option value="">Choose month</option>
                  {months.map((month, index) => (
                    <option key={month} value={String(index + 1)}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="birthday-day">Birthday date 🎂</label>

                <select
                  id="birthday-day"
                  value={birthdayDay}
                  disabled={!birthdayMonth}
                  onChange={(e) => setBirthdayDay(e.target.value)}
                >
                  <option value="">Choose day</option>
                  {Array.from(
                    { length: daysInMonth },
                    (_, index) => index + 1
                  ).map((day) => (
                    <option key={day} value={String(day)}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={startQuestions}>
              Enter My Surprise 💌
            </button>

            <p className="footer-note">Made with love, just for you ♡</p>
          </>
        )}

        {step >= 1 && step <= 3 && currentQuestion && (
          <>
            <div className="rose question-emoji">
              {currentQuestion.emoji}
            </div>

            <p className="eyebrow">
              A LITTLE JOURNEY OF LOVE · {step} OF 3
            </p>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            <h1>{currentQuestion.title}</h1>

            <p className="subtitle">{currentQuestion.subtitle}</p>

            <div className="divider">✧ ── ♡ ── ✧</div>

            <h2 className="question-text">
              {currentQuestion.question}
            </h2>

            <div className="answer-list">
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={answer}
                  className={`answer-button ${selected === index ? "selected" : ""
                    }`}
                  onClick={() => setSelected(index)}
                  aria-pressed={selected === index}
                >
                  {answer}
                  <span>{selected === index ? "💗" : "♡"}</span>
                </button>
              ))}
            </div>

            <button
              onClick={nextQuestion}
              disabled={selected === null}
            >
              {step === 3
                ? "Reveal My Surprise ✨"
                : "Next Little Question 💌"}
            </button>

            <p className="footer-note">
              Every answer makes this moment sweeter ♡
            </p>
          </>
        )}

        {step === 4 && (
          <>
            <div className="rose">💖</div>

            <p className="eyebrow">A LITTLE NOTE FOR YOU</p>

            <h1>
              Aww, Amarah! <span>♡</span>
            </h1>

            <p className="subtitle">
              Take a deep breath, beautiful.
              Something lovely is waiting for you! ✨
            </p>

            <div className="divider">✧ ── ♡ ── ✧</div>

            <h2 className="question-text">
              Ready to open your birthday surprise?
            </h2>

            <div className="answer-summary">
              {answers.map((answer, index) => (
                <p key={index}>
                  <span>{questions[index].emoji}</span>
                  {answer}
                </p>
              ))}
            </div>

            <button onClick={openBirthdaySurprise}>
              Open My Birthday Surprise 🎂
            </button>

            <p className="footer-note">
              Someone made this little world just for you ♡
            </p>
          </>
        )}

        {step === 5 && (
          <>
            <div className="birthday-sparkles">✨ 💗 ✨</div>

            <div className="cake-illustration">
              <span className="cake-candle">🕯️</span>
              <span className="cake-emoji">🎂</span>
              <span className="cake-flower">🌹</span>
            </div>

            <p className="eyebrow">TODAY IS ALL ABOUT YOU</p>

            <h1 className="birthday-title">
              Happy Birthday,
              <br />
              <span>Amarah! ❤️</span>
            </h1>

            <div className="divider">✧ ── ♡ ── ✧</div>

            <div className="music-player">
              <div className={`music-note ${musicOn ? "music-playing" : ""}`}>
                🎵
              </div>

              <div className="music-info">
                <strong>Our Little Birthday Melody</strong>
                <span>
                  {musicOn
                    ? "Playing just for you, Amarah 💗"
                    : "A little music for your special day"}
                </span>
              </div>

              <button
                type="button"
                className="music-toggle"
                onClick={toggleMusic}
                aria-label={musicOn ? "Pause birthday music" : "Play birthday music"}
              >
                {musicOn ? "Ⅱ Pause" : "▶ Play"}
              </button>

              {musicError && (
                <p className="music-error">
                  Music couldn't start. Check that the MP3 file exists in
                  public/music/birthday-song.mp3, then tap Play again.
                </p>
              )}
            </div>

            <article className="love-letter">
              <div className="letter-flower">💐</div>

              <p className="letter-opening">
                Happy Birthday, my love ❤️
              </p>

              <p>
                No matter how many times we fight, how much we
                hurt each other when we're angry, or how
                disrespected I sometimes feel, my love for you
                remains genuine. ❤️ You mean so much to me, and
                I always try my best to make you happy, stand by
                your side, support you, and do everything I can
                to see that beautiful smile on your face.
              </p>

              <p>
                Sometimes, what hurts me the most isn't the
                argument itself, but feeling like my love, care,
                and efforts don't matter when we're angry with
                each other. Maybe you don't always realize how
                deeply your words affect me, how much I keep
                inside, or how often I stay quiet because I want
                us to be okay rather than let another argument
                come between us.
              </p>

              <p>
                I'm not perfect, my love, and I know I make
                mistakes too. But my feelings for you are real,
                and all I want is for us to understand each other
                better. I want to feel loved, heard, respected,
                and valued, just as I always try to make you feel.
                I don't expect us to never disagree; I just want
                us to remember that we're on the same team, even
                when things get difficult. Because love isn't
                only about being happy together; it's also about
                being gentle with each other's hearts when we're
                upset.
              </p>

              <p>
                Today is your special day, and from the bottom
                of my heart, I pray that Allah blesses you with
                endless happiness, peace, success, good health,
                and everything beautiful your heart desires.
                May your smile always shine, may your worries
                become lighter, and may every dream you're
                working towards come true. You deserve so many
                beautiful things in life, and I genuinely want
                to see you achieve them all.
              </p>

              <p>
                Happy Birthday to the girl I love more than
                words can explain. You're such a special part of
                my life, Amarah, and even when things between us
                get difficult, you still mean the world to me.
                I want to keep making memories with you,
                celebrating your happiness, supporting you
                through your struggles, and growing together—not
                just as a couple, but as two people who learn to
                love each other better every day.
              </p>

              <p>
                All I ask is that we never let anger become
                bigger than our love, that we learn to
                communicate without hurting each other, and that
                we always remember the feelings behind each
                other's words. I want a relationship where we
                both feel safe, appreciated, respected, and
                loved. A relationship where neither of us has
                to hide our pain just to keep the peace, because
                both our hearts matter.
              </p>

              <p>
                So today, enjoy every moment, smile as much as
                you can, and remember that there's someone who
                genuinely cares about you, prays for your
                happiness, and wants to see you win in life.
                That's me, my love.
              </p>

              <p>
                Happy Birthday once again, my beautiful girl.
                May this new year of your life bring you
                everything you've been praying for, and may we
                continue building something beautiful
                together—with more love, patience, trust,
                respect, and understanding.
              </p>

              <p>
                I love you, Amarah, and I want us to keep
                choosing each other, even on the difficult days.
                Today, tomorrow, and through all the little
                moments that make our story ours.
              </p>

              <p>Forever wishing the best for you, my love. ❤️</p>

              <p className="letter-ending">
                Yours, Umair ❤️🫶🏻
              </p>
            </article>

            <h2 className="gallery-heading">
              Little Moments, Beautiful Memories 🌷
            </h2>

            <div className="birthday-gallery birthday-media-gallery">
              {photos.map((photo) => (
                <figure className="memory-photo" key={photo.src}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                  />

                </figure>
              ))}

              <div className="birthday-video">
                <p>A little video, just for you 🎬</p>

                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/photo-1.jpg"
                >
                  <source
                    src={`${basePath}/images/birthday-video.mp4`}
                    type="video/mp4"
                  />
                  Your browser does not support this video.
                </video>
              </div>
            </div>

            <p className="birthday-footer">
              Make a wish, close your eyes, and smile. 🎀
            </p>
          </>
        )}
      </section>
    </main>
  );
}
