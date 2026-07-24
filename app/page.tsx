  return (
    <main className="page">
      <div className="container">
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1 className="section-title">📰 NewsCash</h1>
            <p>Read news and earn rewards</p>
          </div>
        </header>

        {/* Categories */}
        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-chip ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <>
            {[1, 2, 3].map((i) => (
              <div className="news-card" key={i}>
                <div className="skeleton image"></div>

                <div className="news-content">
                  <div className="skeleton title"></div>
                  <div className="skeleton text"></div>
                  <div className="skeleton text short"></div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Articles */}
        {!loading &&
          articles.map((article, index) => (
            <article className="news-card fade-in" key={index}>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="news-image"
                />
              )}

              <div className="news-content">
                <div className="news-source">
                  {article.source?.name || "News"}
                </div>

                <h2 className="news-title">{article.title}</h2>

                <p className="news-description">
                  {article.description}
                </p>

                <div className="news-footer">
                  <small className="news-date">
                    {new Date(
                      article.publishedAt
                    ).toLocaleDateString()}
                  </small>

                  <a
                    className="btn btn-primary"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read →
                  </a>
                </div>
              </div>
            </article>
          ))}

        {!loading && articles.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
            }}
          >
            <h2>No News Found</h2>
            <p>Please try another category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
