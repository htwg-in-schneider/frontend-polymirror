<script setup>
</script>

<template>
  <div class="bg-glow-blob bg-glow-blob-tr"></div>

  <main style="padding-top:var(--nav-height);padding-bottom:var(--sp-24);">
    <div style="text-align:center;padding:var(--sp-16) var(--sp-6) var(--sp-12);position:relative;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:28rem;height:20rem;background:rgba(173,198,255,0.05);border-radius:50%;filter:blur(4rem);pointer-events:none;"></div>
      <div style="position:relative;z-index:1;">
        <p class="section-eyebrow" style="text-align:center;margin-bottom:var(--sp-4);">Legal</p>
        <h1 style="font-family:var(--font-headline);font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-.02em;color:var(--primary);text-shadow:0 0 5px rgba(173,198,255,0.2);margin-bottom:var(--sp-4);">Imprint</h1>
      </div>
    </div>

    <div class="container" style="padding-bottom:var(--sp-16);">
      <div class="legal-content">

        <h2>Information pursuant to &sect; 5 TMG</h2>
        <p>
          PolyMirror &mdash; University Project<br>
          HTWG Konstanz &mdash; University of Applied Sciences<br>
          Alfred-Wachtel-Str. 8<br>
          78462 Konstanz, Germany
        </p>

        <h2>Represented by</h2>
        <p>
          Simon (Project Lead)<br>
          Email: <a href="mailto:kontakt@polymirror.de" class="text-primary">kontakt@polymirror.de</a>
        </p>

        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:kontakt@polymirror.de" class="text-primary">kontakt@polymirror.de</a><br>
          Website: <router-link to="/" class="text-primary">polymirror.de</router-link>
        </p>

        <h2>Disclaimer</h2>
        <h3>Liability for Content</h3>
        <p>
          The contents of our pages were created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general legislation pursuant to &sect; 7 (1) TMG. However, pursuant to &sect;&sect; 8&ndash;10 TMG, we are not obligated to monitor transmitted or stored third-party information.
        </p>

        <h3>Liability for Links</h3>
        <p>
          Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this third-party content. The respective provider or operator of the linked pages is always responsible for their content.
        </p>

        <h2>Copyright</h2>
        <p>
          The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution, and any kind of use beyond the limits of copyright law require the written consent of the respective author or creator.
        </p>

        <h2>Disclaimer</h2>
        <p>
          PolyMirror is a non-commercial university project of HTWG Konstanz. No real financial products are offered. All trades are conducted exclusively with virtual credits.
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.legal-content {
  max-width: 48rem;
  margin-inline: auto;
  color: var(--on-surface-variant);
  font-size: .9375rem;
  line-height: 1.85;
}
.legal-content h2 {
  font-family: var(--font-headline);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--on-surface);
  margin: var(--sp-10) 0 var(--sp-4);
}
.legal-content h3 {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-weight: 700;
  color: var(--on-surface);
  margin: var(--sp-6) 0 var(--sp-3);
}
.legal-content p {
  margin-bottom: var(--sp-4);
}
.legal-content a {
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
