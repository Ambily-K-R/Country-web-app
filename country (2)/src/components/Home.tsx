import React, { useEffect, useState } from "react";
import { z } from "zod";
import "../Home.css";

const CountrySchema = z.object({
  name: z.string(),
  region: z.string(),
  flag: z.string(),
});
type Country = z.infer<typeof CountrySchema>;

const TABS = [
  { label: "All", value: "all" },
  { label: "Asia", value: "asia" },
  { label: "Europe", value: "europe" },
];

const PAGE_SIZE = 4;

const HomeComponent: React.FC = () => {
  const [tab, setTab] = useState("all");
  const [countries, setCountries] = useState<Country[]>([]);
  const [displayed, setDisplayed] = useState<Country[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    let url = "https://restcountries.com/v2/all?fields=name,region,flag";
    if (tab !== "all") {
      url = `https://restcountries.com/v2/region/${tab}?fields=name,region,flag`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const parsed = z.array(CountrySchema).safeParse(data);
        if (parsed.success) {
          setCountries(parsed.data);
          setDisplayed(parsed.data.slice(0, PAGE_SIZE));
          setPage(1);
        } else {
          setError("Failed to load countries.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load countries.");
        setLoading(false);
      });
  }, [tab]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const end = nextPage * PAGE_SIZE;
    setDisplayed(countries.slice(0, end));
    setPage(nextPage);
  };

  const Hero: React.FC = () => {
    const [carouselIdx, setCarouselIdx] = useState(0);
    const carouselCountries = countries.slice(0, 4);

    const handlePrev = () => {
      setCarouselIdx((prev) =>
        prev === 0 ? carouselCountries.length - 1 : prev - 1
      );
    };
    const handleNext = () => {
      setCarouselIdx((prev) =>
        prev === carouselCountries.length - 1 ? 0 : prev + 1
      );
    };
    const handleDotClick = (idx: number) => setCarouselIdx(idx);

    useEffect(() => {
      setCarouselIdx(0);
    }, [countries]);

    return (
      <div className="hero-section">
        <div className="hero-left">
          <div
            className="hero-image-placeholder"
            style={{ position: "relative" }}
          >
            {carouselCountries.length > 0 ? (
              <img
                src={carouselCountries[carouselIdx].flag}
                alt={carouselCountries[carouselIdx].name}
                className="carousel-flag-img"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  border: "2px solid #4fc3f7",
                  borderRadius: 8,
                  background: "#f5f5f5",
                }}
              />
            ) : (
              <div className="upload-icon">⬆️</div>
            )}
            <div
              className="hero-label"
              style={{ color: "#4fc3f7", marginTop: 8 }}
            >
              Image
            </div>
            <div className="pagination-dots" style={{ marginTop: 16 }}>
              {carouselCountries.length > 1 && (
                <button
                  className="carousel-arrow left"
                  onClick={handlePrev}
                  aria-label="Previous"
                  style={{ position: "static" }}
                >
                  &#8592;
                </button>
              )}
              {carouselCountries.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot${carouselIdx === idx ? " active" : ""}`}
                  onClick={() => handleDotClick(idx)}
                  style={{ cursor: "pointer" }}
                />
              ))}
              {carouselCountries.length > 1 && (
                <button
                  className="carousel-arrow right"
                  onClick={handleNext}
                  aria-label="Next"
                  style={{ position: "static" }}
                >
                  &#8594;
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="frame-placeholder">
            {carouselCountries[carouselIdx] ? (
              <img
                src={carouselCountries[carouselIdx].flag}
                alt={carouselCountries[carouselIdx].name}
                className="carousel-flag-img"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  border: "2px solid #bbb",
                  borderRadius: 8,
                  background: "#f5f5f5",
                  marginBottom: 8,
                }}
              />
            ) : null}
            <div className="frame-label">Frame</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="countries-heading">Countries</div>
        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.value}
              className={`tab-btn${tab === t.value ? " active" : ""}`}
              onClick={() => setTab(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>
      <div className="home-main-scroll">
        <div className="welcome-row">
          <div className="welcome-line" />
          <div className="welcome-title">WELCOME</div>
          <div className="welcome-line" />
        </div>
        <Hero />
        <section className="country-grid-section">
          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error-msg">{error}</div>}
          <div className="country-row">
            {displayed.map((country, idx) => (
              <div className="country-card" key={country.name + idx}>
                <div className="country-flag-placeholder">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="country-flag-img"
                    style={{ opacity: 0.7 }}
                  />
                </div>
                <div className="country-info">
                  <div className="country-name">{country.name}</div>
                  <div className="country-region">{country.region}</div>
                </div>
              </div>
            ))}
          </div>
          {displayed.length < countries.length && !loading && (
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </section>
      </div>
      <footer className="home-footer">
        <div className="footer-icons">
          <span className="footer-icon" title="Google">
            &#x1F310;
          </span>
          <span className="footer-icon" title="Facebook">
            &#x1F5E8;
          </span>
          <span className="footer-icon" title="LinkedIn">
            in
          </span>
          <span className="footer-icon" title="Twitter">
            &#x1F426;
          </span>
        </div>
        <div className="footer-email">Example@Name.com</div>
        <div className="footer-copyright">
          Copyright &copy; 2020 Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
export default HomeComponent;
