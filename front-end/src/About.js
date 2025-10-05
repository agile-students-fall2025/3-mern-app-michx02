import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AboutUs() {
  const [about, setAbout] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    
    const base = process.env.REACT_APP_SERVER_HOSTNAME || 'http://localhost:7001';

    axios.get(`${base}/about`, { validateStatus: () => true }) // don't throw on non-200
      .then(res => {
        if (res.status >= 200 && res.status < 300 && res.data) {
            setAbout(res.data);    // success
        } else {
            setFailed(true);       // non-2xx or empty body
        }
        })

      .catch(() => {
        // Network-level error only
        setFailed(true);
      });
  }, []);

  if (failed) return <p>Couldn’t load About content. Please try again later.</p>;
  if (!about) return <p>Loading…</p>;

  return (
    <main style={{ maxWidth: 800, margin: '2rem auto', lineHeight: 1.6 }}>
      <h1>{about.title}</h1>
      {about.photoUrl && (
        <img
          src={about.photoUrl}
          alt="About portrait"
          
        />
      )}
      {about.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
    </main>
  );
}