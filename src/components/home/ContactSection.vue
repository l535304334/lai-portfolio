<script setup lang="ts">
import { computed } from 'vue'
import { Github, Mail, ArrowUpRight } from 'lucide-vue-next'
import type { ContactInfo } from '@/types/contact'

const props = defineProps<{
  contact: ContactInfo
}>()

const githubHandle = computed(() =>
  props.contact.github.replace(/^https?:\/\/github\.com\//, ''),
)
</script>

<template>
  <section class="contact" aria-labelledby="contact-title">
    <div class="container">
      <div class="contact__grid">
        <div class="contact__main">
          <p class="contact__eyebrow mono">// 联系方式</p>
          <h2 id="contact-title" class="contact__title">赖睿轩</h2>
          <p class="contact__lead">软件工程学生</p>
        </div>

        <dl class="contact__methods">
          <div class="contact__method">
            <dt class="contact__method-key mono">
              <Mail :size="14" :stroke-width="1.75" aria-hidden="true" />
              Email
            </dt>
            <dd class="contact__method-value">
              <a :href="`mailto:${contact.email}`" class="contact__link">
                {{ contact.email }}
              </a>
            </dd>
          </div>

          <div class="contact__method">
            <dt class="contact__method-key mono">
              <Github :size="14" :stroke-width="1.75" aria-hidden="true" />
              GitHub
            </dt>
            <dd class="contact__method-value">
              <a
                :href="contact.github"
                target="_blank"
                rel="noopener noreferrer"
                class="contact__link"
              >
                {{ githubHandle }}
                <ArrowUpRight :size="12" :stroke-width="2" aria-hidden="true" />
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: var(--space-20) 0;
}

.contact__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-10);
  align-items: start;
}

.contact__eyebrow {
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
}

.contact__title {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: -0.01em;
  margin-bottom: var(--space-2);
}

.contact__lead {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  max-width: 28rem;
}

/* Contact methods — definition list styled as key-value pairs */
.contact__methods {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.contact__method {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.contact__method-key {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact__method-value {
  font-size: var(--text-base);
}

.contact__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-family: var(--font-mono);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.contact__link:hover {
  color: var(--color-accent);
}

@media (min-width: 768px) {
  .contact__grid {
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-16);
  }

  .contact__title {
    font-size: var(--text-4xl);
  }
}
</style>
