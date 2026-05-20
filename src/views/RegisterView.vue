<script setup>
import { ref } from 'vue';
import authBg from '@/assets/images/auth-bg.jpg';

const showPassword = ref(false);
</script>

<template>
  <div class="bg-glow-blob bg-glow-blob-tr"></div>
  <div class="bg-glow-blob bg-glow-blob-bl"></div>

  <nav class="auth-mobile-nav">
    <router-link to="/" class="nav-brand">
      <span class="material-symbols-outlined text-primary" style="font-size:1.75rem;">hub</span>
      PolyMirror
    </router-link>
    <button class="hamburger-btn" aria-label="Menu"><span class="material-symbols-outlined">menu</span></button>
  </nav>

  <div class="mobile-menu">
    <router-link to="/markets" class="mobile-menu-link">Markets</router-link>
    <router-link to="/dashboard" class="mobile-menu-link">Dashboard</router-link>
    <router-link to="/leaderboard" class="mobile-menu-link">Leaderboard</router-link>
    <router-link to="/faq" class="mobile-menu-link">FAQ</router-link>
    <div class="mobile-menu-divider"></div>
    <div class="mobile-menu-actions">
      <router-link to="/register" class="btn btn-secondary">Sign In</router-link>
      <router-link to="/login" class="btn btn-primary">Log In</router-link>
    </div>
  </div>

  <div class="auth-layout">
    <!-- Brand side -->
    <div class="auth-brand-side" style="width:55%;">
      <img :src="authBg" alt="" class="auth-brand-img">
      <div class="auth-brand-content">
        <router-link to="/" class="flex items-center gap-2" style="text-decoration:none;">
          <span class="material-symbols-outlined text-primary" style="font-size:2.25rem;">hub</span>
          <span style="font-family:var(--font-headline);font-size:1.75rem;font-weight:900;letter-spacing:-.02em;text-transform:uppercase;color:var(--primary);">PolyMirror</span>
        </router-link>
        <div style="max-width:28rem;">
          <p class="auth-brand-tagline">PolyMirror</p>
          <h2 class="auth-brand-title">
            Begin your path to
            <span class="text-primary" style="font-style:italic;">Prediction Market Mastery.</span>
          </h2>
          <p class="auth-brand-subtitle">Sign up and get 10,000 Poly. Practice trading on real Polymarket odds before risking real money.</p>
        </div>
        <div class="stat-group" style="opacity:0.65;">
          <div class="stat"><span class="stat-label">Market Vol</span><span class="stat-value">$1.2B+</span></div>
          <div class="stat"><span class="stat-label">Active Markets</span><span class="stat-value">867</span></div>
        </div>
      </div>
    </div>

    <!-- Form side -->
    <div class="auth-form-side">
      <div class="auth-form-wrap" style="padding-top:calc(var(--sp-14) + 3rem);">
        <h1 class="auth-title">Create Identity</h1>
        <p class="auth-subtitle">Enter the grid to begin predict.</p>

        <form style="display:flex;flex-direction:column;gap:var(--sp-6);">
          <div class="form-group">
            <label class="form-label" for="email">Email Address</label>
            <div class="input-wrapper">
              <span class="material-symbols-outlined">mail</span>
              <input class="form-input has-icon" id="email" type="email" placeholder="operator@network.net" autocomplete="email">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="username">Username</label>
            <div class="input-wrapper">
              <span class="material-symbols-outlined">alternate_email</span>
              <input class="form-input has-icon" id="username" type="text" placeholder="VANGUARD_01" style="font-family:var(--font-label);">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <div class="input-wrapper">
              <span class="material-symbols-outlined">lock</span>
              <input class="form-input has-icon" id="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••••••" autocomplete="new-password">
              <button type="button" @click="showPassword = !showPassword" style="position:absolute;right:var(--sp-4);top:50%;transform:translateY(-50%);color:var(--outline);transition:color var(--t-base);background:none;border:none;cursor:pointer;">
                <span class="material-symbols-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Gender</label>
            <div class="form-radio-group">
              <label class="form-radio-btn">
                <input type="radio" name="gender" value="male">
                <div class="form-radio-label"><span class="material-symbols-outlined" style="font-size:1.25rem;">male</span>Male</div>
              </label>
              <label class="form-radio-btn">
                <input type="radio" name="gender" value="female">
                <div class="form-radio-label"><span class="material-symbols-outlined" style="font-size:1.25rem;">female</span>Female</div>
              </label>
              <label class="form-radio-btn">
                <input type="radio" name="gender" value="nonbinary">
                <div class="form-radio-label"><span class="material-symbols-outlined" style="font-size:1.25rem;">diversity_3</span>Non-binary</div>
              </label>
            </div>
          </div>
          <label class="form-checkbox">
            <input type="checkbox" id="terms" required>
            <span class="form-checkbox-label">
              I acknowledge the terms of <a href="#" class="form-link">polymirror</a> and authorize identity anchoring.
            </span>
          </label>
          <button type="submit" class="btn btn-kinetic" style="width:100%;padding:var(--sp-4);font-size:.875rem;border-radius:var(--radius-lg);justify-content:center;gap:var(--sp-2);">
            Sign Up
            <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">bolt</span>
          </button>
        </form>

        <div class="form-divider">
          <div class="form-divider-line"></div>
          <span class="form-divider-text">External Linkages</span>
          <div class="form-divider-line"></div>
        </div>
        <button class="social-btn" style="width:100%;">
          <span class="material-symbols-outlined" style="font-size:1.25rem;">language</span>
          Google
        </button>

        <p class="auth-footer-text">
          Already part of polymirror?
          <router-link to="/login" class="form-link" style="margin-left:4px;">Log In</router-link>
        </p>

        <div class="flex justify-center gap-6" style="margin-top:var(--sp-8);">
          <a href="#" class="text-label-sm text-dim" style="letter-spacing:.15em;text-transform:uppercase;">Privacy Protocol</a>
          <a href="#" class="text-label-sm text-dim" style="letter-spacing:.15em;text-transform:uppercase;">System Terms</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
