<script setup>
</script>

<template>
  <div class="bg-glow-blob bg-glow-blob-tr"></div>

  <main style="padding-top:var(--nav-height);padding-bottom:var(--sp-24);">
    <div style="text-align:center;padding:var(--sp-16) var(--sp-6) var(--sp-12);position:relative;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:28rem;height:20rem;background:rgba(173,198,255,0.05);border-radius:50%;filter:blur(4rem);pointer-events:none;"></div>
      <div style="position:relative;z-index:1;">
        <p class="section-eyebrow" style="text-align:center;margin-bottom:var(--sp-4);">Legal</p>
        <h1 style="font-family:var(--font-headline);font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-.02em;color:var(--primary);text-shadow:0 0 5px rgba(173,198,255,0.2);margin-bottom:var(--sp-4);">Privacy Policy</h1>
      </div>
    </div>

    <div class="container" style="padding-bottom:var(--sp-16);">
      <div class="legal-content">

        <h2>1. Privacy at a Glance</h2>
        <h3>General Information</h3>
        <p>
          The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you.
        </p>

        <h2>2. Responsible Party</h2>
        <p>
          PolyMirror &mdash; University Project<br>
          HTWG Konstanz<br>
          Alfred-Wachtel-Str. 8<br>
          78462 Konstanz, Germany<br>
          Email: <a href="mailto:kontakt@polymirror.de" class="text-primary">kontakt@polymirror.de</a>
        </p>

        <h2>3. Data Collection on this Website</h2>
        <h3>What data is collected?</h3>
        <p>
          Upon registration, the following data is collected: username, email address, and a password (stored encrypted via BCrypt). This data is used exclusively for providing the service.
        </p>

        <h3>How is your data collected?</h3>
        <p>
          Your data is collected when you provide it to us (e.g. during registration). Other data is automatically collected by our IT systems when you visit the website. This is primarily technical data (e.g. internet browser, operating system, time of page access).
        </p>

        <h2>4. Hosting</h2>
        <p>
          This website is hosted as part of a university project locally or on servers of HTWG Konstanz. No data is transferred to third countries.
        </p>

        <h2>5. Cookies &amp; Local Storage</h2>
        <p>
          This website does not use tracking cookies. To maintain your session, the browser's Local Storage is used to store your login data (User ID). This data is automatically deleted upon logout.
        </p>

        <h2>6. Contact Form</h2>
        <p>
          When you send us inquiries via the contact form, your information (name, email, message) is transmitted to our email inbox via a mailto: link. The data is not stored on our servers but is sent exclusively through your local email client.
        </p>

        <h2>7. Your Rights</h2>
        <p>You have the right at any time to:</p>
        <ul>
          <li>Access information about your stored personal data</li>
          <li>Correct inaccurate data</li>
          <li>Delete your data (via the profile page or by email request)</li>
          <li>Restrict processing</li>
          <li>Object to processing</li>
          <li>Data portability</li>
        </ul>

        <h2>8. Disclaimer</h2>
        <p>
          PolyMirror is a non-commercial university project of HTWG Konstanz. No real financial transactions are conducted. All trades are performed with virtual credits.
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
.legal-content ul {
  margin: 0 0 var(--sp-4) var(--sp-6);
  padding: 0;
  list-style: disc;
}
.legal-content li {
  margin-bottom: var(--sp-2);
}
.legal-content a {
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
