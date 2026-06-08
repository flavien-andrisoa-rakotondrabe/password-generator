import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================
// DESIGN SYSTEM & DESIGN TOKENS (Normes Professionnelles)
// ============================================================

const THEME = {
  colors: {
    bg: {
      primary: 'var(--color-background-primary, #ffffff)',
      secondary: 'var(--color-background-secondary, #f8f9fa)',
      tertiary: 'var(--color-background-tertiary, #f1f3f5)',
      info: 'rgba(24, 95, 165, 0.08)',
      success: 'rgba(99, 153, 34, 0.08)',
      warning: 'rgba(239, 159, 39, 0.08)',
      danger: 'rgba(226, 75, 74, 0.08)',
    },
    text: {
      primary: 'var(--color-text-primary, #212529)',
      secondary: 'var(--color-text-secondary, #495057)',
      tertiary: 'var(--color-text-tertiary, #adb5bd)',
      info: '#185FA5',
      success: '#639922',
      warning: '#BA7517',
      danger: '#E24B4A',
    },
    border: {
      primary: 'var(--color-border-primary, #dee2e6)',
      secondary: 'var(--color-border-secondary, #e9ecef)',
      tertiary: 'var(--color-border-tertiary, #f1f3f5)',
      info: 'rgba(24, 95, 165, 0.2)',
      success: 'rgba(99, 153, 34, 0.2)',
      warning: 'rgba(239, 159, 39, 0.2)',
      danger: 'rgba(226, 75, 74, 0.2)',
    },
  },
  typography: {
    mono: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
    sans: '"Inter", system-ui, -apple-system, sans-serif',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
  },
};

// ============================================================
// CONSTANTES & ENTRAINEMENT DES DICTIONNAIRES
// ============================================================

const CHARSETS_MAP = {
  d: '0123456789',
  l: 'abcdefghijklmnopqrstuvwxyz',
  ld: 'abcdefghijklmnopqrstuvwxyz0123456789',
  an: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  full: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?',
};

const DICT_BASE = [
  '123456',
  'password',
  '123456789',
  '12345678',
  '12345',
  'qwerty',
  'abc123',
  '111111',
  '1234567',
  'iloveyou',
  'adobe123',
  '123123',
  'sunshine',
  'princess',
  'letmein',
  '666666',
  'shadow',
  'master',
  'michael',
  'superman',
  'jessica',
  'dragon',
  'pass',
  'monkey',
  '654321',
  'mustang',
  'batman',
  'trustno1',
  'hello',
  'charlie',
  'donald',
  'password1',
  'qwerty123',
  'admin',
  'welcome',
  'login',
  'test',
  'user',
  'guest',
  'root',
  'toor',
  'magic',
  'access',
  'flower',
  'soccer',
  'hockey',
  'zaq1zaq1',
  '1q2w3e4r',
  'q1w2e3r4',
  '1qaz2wsx',
  'secret',
  '1234',
  'pass123',
];

const DICT_EXT = [
  ...DICT_BASE,
  'computer',
  'network',
  'internet',
  'security',
  'system',
  'hacker',
  'matrix',
  'cyber',
  'angel',
  'baby',
  'sexy',
  'cute',
  'king',
  'queen',
  'god',
  'jesus',
  'allah',
  'love',
  'summer',
  'winter',
  'spring',
  'autumn',
  'password2',
  'passw0rd',
  'p@ssword',
  'pa$$word',
  'letmein1',
  'welcome1',
  'qwerty1',
  'abc1234',
  '123abc',
  'test123',
  'hello123',
  'admin123',
  'root123',
  'user123',
  'guest123',
  'love123',
  'angel123',
  'star',
  'sun',
  'moon',
  'fire',
  'water',
  'earth',
  'wind',
  'stone',
  'blue',
  'red',
  'green',
  'black',
  'white',
  'yellow',
  'orange',
  'purple',
  'alpha',
  'beta',
  'gamma',
  'delta',
  'omega',
  'xbox',
  'ps4',
  'wifi',
  'home',
  'work',
  'cafe',
  'music',
  'sport',
  'game',
  'play',
  'team',
  'win',
  'best',
  'good',
  'cool',
  'nice',
  'hot',
  'big',
  'new',
  'old',
  'max',
  'ultra',
  'pro',
  'super',
  'mega',
  'hyper',
  'ninja',
  'pirate',
  'dragon',
  'tiger',
  'eagle',
  'wolf',
  'fox',
  'lion',
  'bear',
];

const DICT_500 = Array.from({ length: 500 }, (_, i) =>
  i < DICT_EXT.length ? DICT_EXT[i] : 'word' + i,
);

const DICT_MAP = {
  10: DICT_BASE.slice(0, 10),
  50: DICT_BASE,
  100: DICT_EXT,
  500: DICT_500,
  rockyou: DICT_EXT,
};

const DEMO_ACCOUNTS = {
  admin: 'Admin@2024!',
  user: 'password123',
  jean: 'jean2024',
  guest: '123456',
};

const MUTATIONS = {
  digits: (w) => Array.from({ length: 100 }, (_, i) => w + i),
  cap: (w) => [w[0].toUpperCase() + w.slice(1)],
  leet: (w) => [
    w
      .replace(/a/gi, '4')
      .replace(/e/gi, '3')
      .replace(/i/gi, '1')
      .replace(/o/gi, '0')
      .replace(/s/gi, '5')
      .replace(/t/gi, '7'),
  ],
  year: (w) =>
    ['2020', '2021', '2022', '2023', '2024', '2025'].map((y) => w + y),
  spec: (w) => ['!', '!!', '@', '#', '$', '123!'].map((s) => w + s),
  rev: (w) => [w.split('').reverse().join('')],
  dup: (w) => [w + w],
  upper: (w) => [w.toUpperCase()],
};

// ============================================================
// LOGIQUE DE CALCUL CRYPTOGRAPHIQUE & STATS
// ============================================================

function calcEntropy(pw) {
  let s = 0;
  if (/[a-z]/.test(pw)) s += 26;
  if (/[A-Z]/.test(pw)) s += 26;
  if (/[0-9]/.test(pw)) s += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) s += 32;
  return pw.length * Math.log2(s || 1);
}

function getQuality(entropy) {
  if (entropy < 28)
    return {
      label: 'Très faible',
      level: 'weak',
      color: '#E24B4A',
      bg: 'rgba(226,75,74,0.1)',
      pct: 20,
    };
  if (entropy < 45)
    return {
      label: 'Faible',
      level: 'low',
      color: '#BA7517',
      bg: 'rgba(186,117,23,0.1)',
      pct: 40,
    };
  if (entropy < 65)
    return {
      label: 'Moyen',
      level: 'medium',
      color: '#EF9F27',
      bg: 'rgba(239,159,39,0.1)',
      pct: 60,
    };
  if (entropy < 80)
    return {
      label: 'Fort',
      level: 'strong',
      color: '#639922',
      bg: 'rgba(99,153,34,0.1)',
      pct: 80,
    };
  return {
    label: 'Très fort',
    level: 'vstrong',
    color: '#185FA5',
    bg: 'rgba(24,95,165,0.1)',
    pct: 100,
  };
}

function fmtN(n) {
  if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T';
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'G';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return String(n);
}

function fmtTime(secs) {
  if (secs < 1) return '<1s';
  if (secs < 60) return Math.round(secs) + 's';
  if (secs < 3600) return Math.round(secs / 60) + ' min';
  if (secs < 86400) return Math.round(secs / 3600) + 'h';
  if (secs < 31536000) return Math.round(secs / 86400) + ' jrs';
  if (secs < 3.15e10) return Math.round(secs / 31536000) + ' ans';
  return Math.round(secs / 3.15e13) + ' millénaires';
}

function calcCombos(charset, maxLen) {
  let t = 0;
  for (let l = 1; l <= maxLen; l++) t += Math.pow(charset.length, l);
  return t;
}

function buildPassword(opts) {
  const AMBIG = '0O1lI';
  let pool = '';
  if (opts.lower) {
    let s = 'abcdefghijklmnopqrstuvwxyz';
    if (opts.noambig)
      s = s
        .split('')
        .filter((c) => !AMBIG.includes(c))
        .join('');
    pool += s;
  }
  if (opts.upper) {
    let s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (opts.noambig)
      s = s
        .split('')
        .filter((c) => !AMBIG.includes(c))
        .join('');
    pool += s;
  }
  if (opts.digits) {
    let s = '0123456789';
    if (opts.noambig)
      s = s
        .split('')
        .filter((c) => !AMBIG.includes(c))
        .join('');
    pool += s;
  }
  if (opts.special) pool += '!@#$%^&*()-_=+[]{}|;:,.?';
  if (!pool) pool = 'abcdefghijklmnopqrstuvwxyz';
  if (opts.pron) {
    const cons = 'bcdfghjklmnprstvwxyz',
      vow = 'aeiou';
    let r = '';
    for (let i = 0; i < opts.len; i++)
      r +=
        i % 2 === 0
          ? cons[Math.floor(Math.random() * cons.length)]
          : vow[Math.floor(Math.random() * vow.length)];
    return r;
  }
  const req = [];
  if (opts.lower)
    req.push('abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]);
  if (opts.upper)
    req.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]);
  if (opts.digits) req.push('0123456789'[Math.floor(Math.random() * 10)]);
  if (opts.special) req.push('!@#$%^&*'[Math.floor(Math.random() * 8)]);
  let pw = '';
  while (pw.length < opts.len - req.length)
    pw += pool[Math.floor(Math.random() * pool.length)];
  pw = pw + req.join('');
  return pw
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

function* bruteForceGen(charset, maxLen) {
  for (let len = 1; len <= maxLen; len++) {
    const idx = new Array(len).fill(0);
    while (true) {
      yield idx.map((i) => charset[i]).join('');
      let pos = len - 1;
      while (pos >= 0) {
        idx[pos]++;
        if (idx[pos] < charset.length) break;
        idx[pos] = 0;
        pos--;
      }
      if (pos < 0) break;
    }
  }
}

// ============================================================
// COMPOSANTS REUTILISABLES ET ATOMIQUE UI
// ============================================================

function StrengthBar({ entropy }) {
  const q = getQuality(entropy);
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          height: 6,
          background: THEME.colors.bg.tertiary,
          borderRadius: THEME.radius.full,
          overflow: 'hidden',
          marginBottom: 8,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${q.pct}%`,
            background: q.color,
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: THEME.colors.text.secondary,
            fontFamily: THEME.typography.mono,
          }}
        >
          {entropy.toFixed(1)} bits d'entropie
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            padding: '4px 12px',
            borderRadius: THEME.radius.full,
            background: q.bg,
            color: q.color,
            border: `1px solid ${q.color}25`,
            fontFamily: THEME.typography.sans,
          }}
        >
          {q.label}
        </span>
      </div>
    </div>
  );
}

function CharPill({ active, label, icon }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 12px',
        borderRadius: THEME.radius.sm,
        border: `1px solid ${active ? THEME.colors.text.success + '40' : THEME.colors.border.primary}`,
        background: active
          ? THEME.colors.bg.success
          : THEME.colors.bg.secondary,
        transition: 'all 0.2s ease',
      }}
    >
      <i
        className={`ti ${icon}`}
        style={{
          fontSize: 14,
          color: active
            ? THEME.colors.text.success
            : THEME.colors.text.tertiary,
        }}
        aria-hidden="true"
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: active ? 500 : 400,
          color: active
            ? THEME.colors.text.success
            : THEME.colors.text.secondary,
          fontFamily: THEME.typography.sans,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function StatusBanner({ type, title, detail }) {
  const cfg = {
    found: {
      icon: 'ti-circle-check',
      border: THEME.colors.border.success,
      bg: THEME.colors.bg.success,
      color: THEME.colors.text.success,
    },
    fail: {
      icon: 'ti-circle-x',
      border: THEME.colors.border.danger,
      bg: THEME.colors.bg.danger,
      color: THEME.colors.text.danger,
    },
    info: {
      icon: 'ti-info-circle',
      border: THEME.colors.border.info,
      bg: THEME.colors.bg.info,
      color: THEME.colors.text.info,
    },
  };
  const c = cfg[type] || cfg.info;
  return (
    <div
      style={{
        borderRadius: THEME.radius.md,
        padding: '14px 16px',
        marginTop: 16,
        border: `1px solid ${c.border}`,
        background: c.bg,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        boxShadow: THEME.shadow.sm,
      }}
    >
      <i
        className={`ti ${c.icon}`}
        style={{ fontSize: 20, color: c.color, flexShrink: 0 }}
        aria-hidden="true"
      />
      <div>
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            color: c.color,
            marginBottom: 4,
            fontFamily: THEME.typography.sans,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: THEME.colors.text.secondary,
            lineHeight: 1.5,
            fontFamily: THEME.typography.sans,
          }}
          dangerouslySetInnerHTML={{ __html: detail }}
        />
      </div>
    </div>
  );
}

function StatCard({ value, label, icon }) {
  return (
    <div
      style={{
        background: THEME.colors.bg.secondary,
        border: `1px solid ${THEME.colors.border.secondary}`,
        borderRadius: THEME.radius.md,
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: THEME.colors.text.tertiary,
        }}
      >
        {icon && (
          <i
            className={`ti ${icon}`}
            style={{ fontSize: 14 }}
            aria-hidden="true"
          />
        )}
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontFamily: THEME.typography.sans,
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          fontFamily: THEME.typography.mono,
          color: THEME.colors.text.primary,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: THEME.colors.bg.primary,
        border: `1px solid ${THEME.colors.border.primary}`,
        borderRadius: THEME.radius.lg,
        padding: '24px',
        marginBottom: 20,
        boxShadow: THEME.shadow.sm,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: subtitle ? 6 : 0,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: THEME.radius.sm,
            background: THEME.colors.bg.info,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <i
            className={`ti ${icon}`}
            style={{ fontSize: 16, color: THEME.colors.text.info }}
            aria-hidden="true"
          />
        </div>
        <h2
          style={{
            fontSize: 16,
            fontWeight: 600,
            margin: 0,
            color: THEME.colors.text.primary,
            fontFamily: THEME.typography.sans,
          }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          style={{
            fontSize: 13,
            color: THEME.colors.text.secondary,
            margin: '0 0 0 42px',
            lineHeight: 1.5,
            fontFamily: THEME.typography.sans,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: '1px',
        background: THEME.colors.border.secondary,
        margin: '20px 0',
      }}
    />
  );
}

function TextInput({ icon, style, className, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: 'relative' }} className={className}>
      {icon && (
        <i
          className={`ti ${icon}`}
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 16,
            color: focused
              ? THEME.colors.text.info
              : THEME.colors.text.tertiary,
            pointerEvents: 'none',
            transition: 'color 0.2s',
          }}
          aria-hidden="true"
        />
      )}
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: THEME.colors.bg.secondary,
          border: `1px solid ${focused ? THEME.colors.text.info : THEME.colors.border.primary}`,
          borderRadius: THEME.radius.sm,
          color: THEME.colors.text.primary,
          fontFamily: THEME.typography.mono,
          fontSize: 14,
          padding: icon ? '10px 12px 10px 38px' : '10px 12px',
          outline: 'none',
          boxShadow: focused ? `0 0 0 3px ${THEME.colors.text.info}15` : 'none',
          transition: 'all 0.15s ease',
          ...style,
        }}
        {...props}
      />
    </div>
  );
}

function Select({ children, style, ...props }) {
  return (
    <select
      style={{
        width: '100%',
        boxSizing: 'border-box',
        background: THEME.colors.bg.secondary,
        border: `1px solid ${THEME.colors.border.primary}`,
        borderRadius: THEME.radius.sm,
        color: THEME.colors.text.primary,
        fontFamily: THEME.typography.sans,
        fontSize: 14,
        padding: '10px 12px',
        outline: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
        ...style,
      }}
      {...props}
    >
      {children}
    </select>
  );
}

function Button({
  variant = 'primary',
  icon,
  children,
  full,
  style,
  disabled,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const variants = {
    primary: {
      background: THEME.colors.text.info,
      border: `1px solid ${THEME.colors.text.info}`,
      color: '#ffffff',
    },
    danger: {
      background: THEME.colors.text.danger,
      border: `1px solid ${THEME.colors.text.danger}`,
      color: '#ffffff',
    },
    success: {
      background: THEME.colors.text.success,
      border: `1px solid ${THEME.colors.text.success}`,
      color: '#ffffff',
    },
    ghost: {
      background: 'transparent',
      border: `1px solid ${THEME.colors.border.primary}`,
      color: THEME.colors.text.secondary,
    },
  };

  return (
    <button
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        borderRadius: THEME.radius.sm,
        fontFamily: THEME.typography.sans,
        fontSize: 14,
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        transition: 'all 0.2s ease',
        width: full ? '100%' : undefined,
        justifyContent: full ? 'center' : undefined,
        opacity: disabled ? 0.5 : hovered ? 0.9 : 1,
        transform: hovered && !disabled ? 'translateY(-1px)' : 'none',
        boxShadow: hovered && !disabled ? THEME.shadow.sm : 'none',
        ...variants[variant],
        ...style,
      }}
      {...props}
    >
      {icon && (
        <i
          className={`ti ${icon}`}
          aria-hidden="true"
          style={{ fontSize: 16 }}
        />
      )}
      {children}
    </button>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        cursor: 'pointer',
        padding: '6px 0',
        userSelect: 'none',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0, marginTop: 2 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        />
        <div
          style={{
            width: 36,
            height: 20,
            borderRadius: THEME.radius.full,
            background: checked
              ? THEME.colors.text.info
              : THEME.colors.text.tertiary,
            transition: 'background 0.2s ease',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 2,
              left: checked ? 18 : 2,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#ffffff',
              transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          />
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: THEME.colors.text.primary,
            fontFamily: THEME.typography.sans,
          }}
        >
          {label}
        </div>
        {description && (
          <div
            style={{
              fontSize: 12,
              color: THEME.colors.text.secondary,
              marginTop: 2,
              fontFamily: THEME.typography.sans,
            }}
          >
            {description}
          </div>
        )}
      </div>
    </label>
  );
}

function AlertBanner({ children }) {
  return (
    <div
      style={{
        background: THEME.colors.bg.warning,
        border: `1px solid ${THEME.colors.border.warning}`,
        borderRadius: THEME.radius.sm,
        padding: '10px 14px',
        marginTop: 12,
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
      }}
    >
      <i
        className="ti ti-alert-triangle"
        style={{
          fontSize: 16,
          color: THEME.colors.text.warning,
          flexShrink: 0,
          marginTop: 1,
        }}
        aria-hidden="true"
      />
      <span
        style={{
          fontSize: 12,
          color: THEME.colors.text.warning,
          lineHeight: 1.5,
          fontFamily: THEME.typography.sans,
          fontWeight: 500,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function PasswordDisplay({ pw, visible, onToggle, onCopy, copied }) {
  const chars = pw ? pw.split('') : [];
  const getCharColor = (c) => {
    if (/[A-Z]/.test(c)) return THEME.colors.text.info;
    if (/[0-9]/.test(c)) return '#EF9F27';
    if (/[^a-zA-Z0-9]/.test(c)) return '#E24B4A';
    return THEME.colors.text.primary;
  };
  return (
    <div
      style={{
        background: THEME.colors.bg.secondary,
        borderRadius: THEME.radius.md,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        minHeight: 56,
        border: `1px solid ${THEME.colors.border.primary}`,
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
      }}
    >
      <div
        style={{
          flex: 1,
          fontFamily: THEME.typography.mono,
          fontSize: 16,
          wordBreak: 'break-all',
          lineHeight: 1.5,
          letterSpacing: visible ? 'normal' : '0.15em',
        }}
      >
        {!pw ? (
          <span style={{ color: THEME.colors.text.tertiary }}>—</span>
        ) : visible ? (
          chars.map((c, i) => (
            <span key={i} style={{ color: getCharColor(c) }}>
              {c}
            </span>
          ))
        ) : (
          <span style={{ color: THEME.colors.text.tertiary }}>
            {'•'.repeat(Math.min(pw.length, 24))}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: THEME.colors.text.secondary,
            fontSize: 18,
            padding: 6,
            borderRadius: THEME.radius.sm,
          }}
          aria-label="Afficher/masquer"
        >
          <i className={`ti ${visible ? 'ti-eye-off' : 'ti-eye'}`} />
        </button>
        <button
          onClick={onCopy}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: copied
              ? THEME.colors.text.success
              : THEME.colors.text.secondary,
            fontSize: 18,
            padding: 6,
            borderRadius: THEME.radius.sm,
          }}
          aria-label="Copier"
        >
          <i className={`ti ${copied ? 'ti-check' : 'ti-copy'}`} />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// PAGES INDIVIDUELLES
// ============================================================

function PageGenerator() {
  const [pw, setPw] = useState('');
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const [opts, setOpts] = useState({
    len: 16,
    lower: true,
    upper: true,
    digits: true,
    special: true,
    noambig: false,
    pron: false,
  });
  const [analyzePw, setAnalyzePw] = useState('');
  const [analyzeVisible, setAnalyzeVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const generate = useCallback(
    (o = opts) => {
      setPw(buildPassword(o));
    },
    [opts],
  );

  const genPassphrase = () => {
    const words = [
      'correct',
      'horse',
      'battery',
      'staple',
      'cloud',
      'river',
      'stone',
      'light',
      'ocean',
      'forest',
      'mountain',
      'dragon',
      'silver',
      'purple',
      'cosmic',
      'thunder',
      'crystal',
      'shadow',
      'ancient',
      'brave',
    ];
    const pp = Array.from(
      { length: 4 },
      () => words[Math.floor(Math.random() * words.length)],
    ).join('-');
    setPw(pp);
    setVisible(true);
  };

  useEffect(() => {
    generate();
  }, [generate]);

  const changeOpt = (key, val) => {
    const next = { ...opts, [key]: val };
    setOpts(next);
    generate(next);
  };

  const entropy = pw ? calcEntropy(pw) : 0;
  const has = {
    lower: /[a-z]/.test(pw),
    upper: /[A-Z]/.test(pw),
    digits: /[0-9]/.test(pw),
    special: /[^a-zA-Z0-9]/.test(pw),
  };

  const copyPw = () => {
    navigator.clipboard.writeText(pw).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const ae = analyzePw ? calcEntropy(analyzePw) : 0;
  const aq = getQuality(ae);
  const aHas = {
    lower: /[a-z]/.test(analyzePw),
    upper: /[A-Z]/.test(analyzePw),
    digits: /[0-9]/.test(analyzePw),
    special: /[^a-zA-Z0-9]/.test(analyzePw),
  };
  let aCs = 0;
  if (aHas.lower) aCs += 26;
  if (aHas.upper) aCs += 26;
  if (aHas.digits) aCs += 10;
  if (aHas.special) aCs += 32;
  const aCombos = Math.pow(aCs || 1, analyzePw.length || 1);
  const aCrackSecs = aCombos / 500000000;
  const aWarnings = [];
  if (analyzePw.length < 8)
    aWarnings.push('Trop court — minimum 8 caractères recommandé');
  if (DICT_EXT.includes(analyzePw.toLowerCase()))
    aWarnings.push('Présent dans les dictionnaires courants !');
  if (/^(.)\1+$/.test(analyzePw)) aWarnings.push('Caractères répétés détectés');
  if (/^[0-9]+$/.test(analyzePw))
    aWarnings.push('Chiffres uniquement — très vulnérable');

  return (
    <div>
      <Card>
        <SectionHeader
          icon="ti-key"
          title="Générateur de mot de passe"
          subtitle="Générez des chaînes cryptographiques hautement sécurisées conformes ANSSI."
        />
        <PasswordDisplay
          pw={pw}
          visible={visible}
          onToggle={() => setVisible((v) => !v)}
          onCopy={copyPw}
          copied={copied}
        />
        <div style={{ marginTop: 16 }}>
          <StrengthBar entropy={entropy} />
        </div>
        <div
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}
        >
          <CharPill
            active={has.lower}
            label="a–z minuscules"
            icon="ti-letter-case-lower"
          />
          <CharPill
            active={has.upper}
            label="A–Z majuscules"
            icon="ti-letter-case-upper"
          />
          <CharPill active={has.digits} label="0–9 chiffres" icon="ti-123" />
          <CharPill
            active={has.special}
            label="!@# spéciaux"
            icon="ti-asterisk"
          />
        </div>
      </Card>

      <Card>
        <SectionHeader icon="ti-settings" title="Paramètres du générateur" />
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: THEME.colors.text.secondary,
                fontFamily: THEME.typography.sans,
              }}
            >
              Longueur
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                fontFamily: THEME.typography.mono,
                background: THEME.colors.bg.info,
                color: THEME.colors.text.info,
                padding: '4px 12px',
                borderRadius: THEME.radius.full,
              }}
            >
              {opts.len} caractères
            </span>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            step="1"
            value={opts.len}
            onChange={(e) => changeOpt('len', parseInt(e.target.value))}
            style={{
              width: '100%',
              accentColor: THEME.colors.text.info,
              cursor: 'pointer',
              height: 6,
              borderRadius: 3,
            }}
          />
        </div>

        <Divider />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <Toggle
            label="Minuscules (a–z)"
            checked={opts.lower}
            onChange={(e) => changeOpt('lower', e.target.checked)}
          />
          <Toggle
            label="Majuscules (A–Z)"
            checked={opts.upper}
            onChange={(e) => changeOpt('upper', e.target.checked)}
          />
          <Toggle
            label="Chiffres (0–9)"
            checked={opts.digits}
            onChange={(e) => changeOpt('digits', e.target.checked)}
          />
          <Toggle
            label="Spéciaux (!@#$)"
            checked={opts.special}
            onChange={(e) => changeOpt('special', e.target.checked)}
          />
          <Toggle
            label="Exclure homoglyphes"
            description="Évite les confusions (0, O, l, 1)"
            checked={opts.noambig}
            onChange={(e) => changeOpt('noambig', e.target.checked)}
          />
          <Toggle
            label="Lisibilité humaine"
            description="Structure de type mnémonique"
            checked={opts.pron}
            onChange={(e) => changeOpt('pron', e.target.checked)}
          />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button icon="ti-refresh" onClick={() => generate()}>
            Rénouveler la clé
          </Button>
          <Button variant="ghost" icon="ti-text-size" onClick={genPassphrase}>
            Passphrase
          </Button>
        </div>
      </Card>

      <Card>
        <SectionHeader
          icon="ti-scan"
          title="Audit structurel en temps réel"
          subtitle="Analysez instantanément la viabilité d'un mot de passe existant face aux attaques ciblées."
        />
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <div className="relative flex items-center">
            <TextInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Saisissez votre clé d'accès pour l'audit..."
              icon="ti-lock-search"
              value={analyzePw}
              onChange={(e) => setAnalyzePw(e.target.value)}
              style={{ paddingRight: 40 }}
              className={'flex-1'}
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-eye-icon lucide-eye size-4"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-eye-off-icon lucide-eye-off size-4"
                >
                  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                  <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                  <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                  <path d="m2 2 20 20" />
                </svg>
              )}
            </button>
          </div>

          <button
            onClick={() => setAnalyzeVisible((v) => !v)}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: THEME.colors.text.secondary,
              fontSize: 18,
            }}
            aria-label="Afficher"
          >
            <i className={`ti ${analyzeVisible ? 'ti-eye-off' : 'ti-eye'}`} />
          </button>
        </div>
        {analyzePw && (
          <>
            <StrengthBar entropy={ae} />
            <div
              style={{
                gap: 12,
                margin: '16px 0',
              }}
              className="grid grid-cols-2"
            >
              <StatCard
                value={analyzePw.length}
                label="Longueur"
                icon="ti-ruler"
              />
              <StatCard
                value={aCs || '?'}
                label="Espace d'états"
                icon="ti-braces"
              />
              <StatCard
                value={fmtN(aCombos)}
                label="Combinaisons"
                icon="ti-infinity"
              />
              <StatCard
                value={fmtTime(aCrackSecs)}
                label="Délai théorique"
                icon="ti-clock"
              />
            </div>
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                marginBottom: 8,
              }}
            >
              <CharPill
                active={aHas.lower}
                label="a–z"
                icon="ti-letter-case-lower"
              />
              <CharPill
                active={aHas.upper}
                label="A–Z"
                icon="ti-letter-case-upper"
              />
              <CharPill active={aHas.digits} label="0–9" icon="ti-123" />
              <CharPill active={aHas.special} label="!@#" icon="ti-asterisk" />
            </div>
            {aWarnings.map((w, i) => (
              <AlertBanner key={i}>{w}</AlertBanner>
            ))}
          </>
        )}
      </Card>
    </div>
  );
}

function PageLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pwVisible, setPwVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [log, setLog] = useState([]);
  const attemptsRef = useRef(0);
  const lockedRef = useRef(false);
  const lockTimerRef = useRef(null);

  const addLog = (msg, cls) => {
    const ts = new Date().toLocaleTimeString();
    setLog((prev) => [{ ts, msg, cls }, ...prev].slice(0, 25));
  };

  const doLogin = () => {
    if (lockedRef.current) {
      setResult({
        type: 'fail',
        title: 'Compte temporairement verrouillé',
        detail:
          'Mesure de mitigation anti-bruteforce active. Réessayez dans 30 secondes.',
      });
      return;
    }
    if (!username || !password) {
      setResult({
        type: 'info',
        title: 'Champs requis',
        detail: 'Veuillez renseigner vos identifiants réseau.',
      });
      return;
    }
    setLoading(true);
    setTimeout(
      () => {
        setLoading(false);
        const u = username.trim().toLowerCase();
        if (DEMO_ACCOUNTS[u] && DEMO_ACCOUNTS[u] === password) {
          attemptsRef.current = 0;
          addLog(
            '[OK] Émission JWT Token — Session utilisateur accordée : ' + u,
            'ok',
          );
          setResult({
            type: 'found',
            title: 'Authentification réussie',
            detail: `Bienvenue, session active pour l'identifiant <b>${u}</b>.`,
          });
        } else {
          attemptsRef.current++;
          addLog(
            `[REJECT] Échec de transmission #${attemptsRef.current} : user="${u}"`,
            'err',
          );
          if (attemptsRef.current >= 5) {
            lockedRef.current = true;
            addLog(
              '[LOCKOUT] Seuil critique atteint — Verrouillage IP actif (30s)',
              'err',
            );
            setResult({
              type: 'fail',
              title: 'Sécurité globale activée',
              detail:
                'Compte temporairement bloqué (5 échecs consécutifs). Attendez 30s.',
            });
            lockTimerRef.current = setTimeout(() => {
              lockedRef.current = false;
              attemptsRef.current = 0;
              addLog(
                '[INFO] Lockout levé — Interface de connexion réactivée',
                'inf',
              );
            }, 30000);
          } else {
            const remain = 5 - attemptsRef.current;
            setResult({
              type: 'fail',
              title: 'Identifiants invalides',
              detail: `Tentative ${attemptsRef.current}/5. Il reste ${remain} essai(s) autorisé(s).`,
            });
          }
        }
      },
      600 + Math.random() * 400,
    );
  };

  useEffect(() => () => clearTimeout(lockTimerRef.current), []);

  const logColors = {
    ok: THEME.colors.text.success,
    err: THEME.colors.text.danger,
    inf: THEME.colors.text.info,
  };

  const demoAccounts = [
    {
      user: 'admin',
      pw: 'Admin@2024!',
      level: 'Très fort',
      color: THEME.colors.text.success,
    },
    {
      user: 'user',
      pw: 'password123',
      level: 'Faible',
      color: THEME.colors.text.warning,
    },
    {
      user: 'jean',
      pw: 'jean2024',
      level: 'Moyen',
      color: THEME.colors.text.warning,
    },
    {
      user: 'guest',
      pw: '123456',
      level: 'Très faible',
      color: THEME.colors.text.danger,
    },
  ];

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: THEME.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: 8,
    display: 'block',
    fontFamily: THEME.typography.sans,
  };

  return (
    <div>
      <Card>
        <SectionHeader
          icon="ti-building-bank"
          title="Simulateur d'Authentification Réseau"
          subtitle="Démonstration des délais de traitement (Bcrypt latency), rate limiting et politiques de verrouillage."
        />

        <div style={{ marginBottom: 16 }}>
          <span style={labelStyle}>Identifiant ou e-mail</span>
          <TextInput
            icon="ti-user"
            type="text"
            placeholder="admin, user, jean..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <span style={labelStyle}>Clé de chiffrement (Password)</span>
          <div style={{ position: 'relative' }}>
            <TextInput
              icon="ti-lock"
              type={pwVisible ? 'text' : 'password'}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && doLogin()}
              style={{ paddingRight: 40 }}
            />
            <button
              onClick={() => setPwVisible((v) => !v)}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: THEME.colors.text.secondary,
                fontSize: 18,
              }}
              aria-label="Afficher"
            >
              <i className={`ti ${pwVisible ? 'ti-eye-off' : 'ti-eye'}`} />
            </button>
          </div>
        </div>

        <Button
          full
          icon={loading ? 'ti-loader-2' : 'ti-login'}
          onClick={doLogin}
          disabled={loading}
        >
          {loading
            ? 'Traitement cryptographique en cours...'
            : 'Établir la connexion'}
        </Button>

        {result && (
          <StatusBanner
            type={result.type}
            title={result.title}
            detail={result.detail}
          />
        )}
      </Card>

      <Card>
        <SectionHeader
          icon="ti-users"
          title="Profils de test enregistrés (Sandbox)"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
          }}
        >
          {demoAccounts.map((acc) => (
            <button
              key={acc.user}
              onClick={() => {
                setUsername(acc.user);
                setPassword(acc.pw);
              }}
              style={{
                background: THEME.colors.bg.secondary,
                border: `1px solid ${THEME.colors.border.primary}`,
                borderRadius: THEME.radius.md,
                padding: '12px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyBetween: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: THEME.colors.text.primary,
                    fontFamily: THEME.typography.mono,
                  }}
                >
                  {acc.user}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: acc.color,
                    fontFamily: THEME.typography.sans,
                  }}
                >
                  {acc.level}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: THEME.colors.text.secondary,
                  fontFamily: THEME.typography.mono,
                }}
              >
                {acc.pw}
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader icon="ti-history" title="Console Syslog du serveur" />
        <div
          style={{
            maxHeight: 180,
            overflowY: 'auto',
            fontSize: 12,
            fontFamily: THEME.typography.mono,
            color: THEME.colors.text.secondary,
            padding: '12px 14px',
            background: '#1e1e1e',
            color: '#d4d4d4',
            borderRadius: THEME.radius.md,
            lineHeight: 1.6,
          }}
        >
          {log.length === 0 ? (
            <div
              style={{
                color: '#6a9955',
                textAlign: 'center',
                padding: '16px 0',
              }}
            >
              <i
                className="ti ti-terminal"
                style={{ display: 'block', fontSize: 22, marginBottom: 6 }}
                aria-hidden="true"
              />
              Service en écoute active — En attente d'événements réseau
            </div>
          ) : (
            log.map((entry, i) => (
              <div
                key={i}
                style={{
                  padding: '4px 0',
                  borderBottom: '1px solid #2d2d2d',
                  color: logColors[entry.cls] || '#d4d4d4',
                  display: 'flex',
                  gap: 12,
                }}
              >
                <span style={{ color: '#569cd6', flexShrink: 0 }}>
                  [{entry.ts}]
                </span>
                <span>{entry.msg}</span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

function PageAttack() {
  const [target, setTarget] = useState('');
  const [attackType, setAttackType] = useState('dict');
  const [dictSize, setDictSize] = useState('50');
  const [dictSpeed, setDictSpeed] = useState('slow');
  const [bfCharset, setBfCharset] = useState('l');
  const [bfMaxLen, setBfMaxLen] = useState('4');
  const [hybridRules, setHybridRules] = useState({
    digits: true,
    cap: true,
    leet: true,
    year: true,
    spec: false,
    rev: false,
    dup: false,
    upper: false,
  });

  const [running, setRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState('—');
  const [result, setResult] = useState(null);

  const stopRef = useRef(false);
  const timerRef = useRef(null);
  const startRef = useRef(0);

  const stopAttack = () => {
    stopRef.current = true;
  };

  const startAttack = async () => {
    if (!target) {
      setResult({
        type: 'info',
        title: 'Action requise',
        detail: 'Veuillez saisir une cible de hachage.',
      });
      return;
    }
    stopRef.current = false;
    setRunning(true);
    setAttempts(0);
    setElapsed(0);
    setSpeed(0);
    setProgress(0);
    setCurrent('—');
    setResult(null);
    startRef.current = Date.now();
    timerRef.current = setInterval(
      () => setElapsed(Math.round((Date.now() - startRef.current) / 100) / 10),
      100,
    );

    if (attackType === 'dict') await runDict();
    if (attackType === 'brute') await runBrute();
    if (attackType === 'hybrid') await runHybrid();

    clearInterval(timerRef.current);
    setRunning(false);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const updateStats = (att, totalOrNull) => {
    const el = (Date.now() - startRef.current) / 1000;
    setAttempts(att);
    setSpeed(Math.round(att / Math.max(el, 0.01)));
    if (totalOrNull !== null)
      setProgress(Math.min(Math.round((att / totalOrNull) * 100), 100));
  };

  const runDict = async () => {
    const list =
      dictSize === 'rockyou' ? DICT_EXT : DICT_MAP[dictSize] || DICT_BASE;
    const slow = dictSpeed === 'slow';
    let att = 0,
      found = false;
    for (let i = 0; i < list.length && !stopRef.current; i++) {
      att++;
      const w = list[i];
      setCurrent(w);
      updateStats(att, list.length);
      if (w === target) {
        found = true;
        break;
      }
      if (slow && i % 3 === 0) await new Promise((r) => setTimeout(r, 25));
      else if (!slow && i % 100 === 0)
        await new Promise((r) => setTimeout(r, 0));
    }
    const t = ((Date.now() - startRef.current) / 1000).toFixed(2);
    if (found)
      setResult({
        type: 'found',
        title: 'Collision trouvée !',
        detail: `Mot de passe identifié : <b>${target}</b> | Résolu en <b>${att}</b> tests (Temps : <b>${t}s</b>)`,
      });
    else
      setResult({
        type: stopRef.current ? 'info' : 'fail',
        title: stopRef.current
          ? 'Processus avorté'
          : 'Index épuisé sans résultat',
        detail: `Testé <b>${att}</b> entrées en <b>${t}s</b>.`,
      });
  };

  const runBrute = async () => {
    const charset = CHARSETS_MAP[bfCharset];
    const maxLen = parseInt(bfMaxLen);
    const totalCombos = calcCombos(charset, maxLen);
    const MAX = 2000000;
    if (target.length > maxLen) {
      setResult({
        type: 'info',
        title: 'Erreur de périmètre',
        detail: `La cible possède une taille supérieure au masque défini (${maxLen}).`,
      });
      return;
    }
    if (!target.split('').every((c) => charset.includes(c))) {
      setResult({
        type: 'info',
        title: 'Divergence alphabet',
        detail: `La cible intègre des jeux de caractères exclus du sous-ensemble choisi.`,
      });
      return;
    }
    const gen = bruteForceGen(charset, maxLen);
    let att = 0,
      found = false;
    const BATCH = 1000;
    while (!stopRef.current && att < MAX) {
      for (let b = 0; b < BATCH; b++) {
        const nx = gen.next();
        if (nx.done) {
          stopRef.current = true;
          break;
        }
        att++;
        const guess = nx.value;
        if (guess === target) {
          found = true;
          setCurrent(guess);
          break;
        }
        if (b === BATCH - 1) setCurrent(guess);
      }
      if (found) break;
      updateStats(att, Math.min(totalCombos, MAX));
      await new Promise((r) => setTimeout(r, 0));
    }
    const t = ((Date.now() - startRef.current) / 1000).toFixed(2);
    const spd = Math.round(att / Math.max(parseFloat(t), 0.001));
    if (found)
      setResult({
        type: 'found',
        title: 'Espace de clés brisé !',
        detail: `Clé : <b>${target}</b> | Itérations : <b>${fmtN(att)}</b> | Performance : <b>${fmtN(spd)} ops/sec</b>`,
      });
    else if (att >= MAX) {
      const left = totalCombos - att;
      setResult({
        type: 'info',
        title: 'Limite de traitement Sandbox (2M)',
        detail: `Pour poursuivre l'analyse combinatoire spatiale (~<b>${fmtN(left)}</b> restant), migrez sur cluster **Hashcat**.`,
      });
    } else
      setResult({
        type: stopRef.current ? 'info' : 'fail',
        title: 'Terminé',
        detail: `Parcours achevé sans correspondance.`,
      });
  };

  const runHybrid = async () => {
    const variants = new Set();
    for (const base of DICT_EXT) {
      variants.add(base);
      for (const [k, fn] of Object.entries(MUTATIONS)) {
        if (hybridRules[k]) fn(base).forEach((v) => variants.add(v));
      }
    }
    const list = Array.from(variants);
    let att = 0,
      found = false;
    for (let i = 0; i < list.length && !stopRef.current; i++) {
      att++;
      const v = list[i];
      setCurrent(v);
      updateStats(att, list.length);
      if (v === target) {
        found = true;
        break;
      }
      if (i % 15 === 0) await new Promise((r) => setTimeout(r, 0));
    }
    const t = ((Date.now() - startRef.current) / 1000).toFixed(2);
    if (found)
      setResult({
        type: 'found',
        title: 'Mutation validée !',
        detail: `Vecteur : <b>${target}</b> | Population calculée : <b>${fmtN(list.length)}</b>`,
      });
    else
      setResult({
        type: stopRef.current ? 'info' : 'fail',
        title: 'Échec analytique',
        detail: `Aucune règle syntaxique n'a permis de reconstruire la clé.`,
      });
  };

  const te = target ? calcEntropy(target) : 0;
  const tq = getQuality(te);
  const bfCs = CHARSETS_MAP[bfCharset];
  const bfMaxL = parseInt(bfMaxLen);
  const bfTotal = calcCombos(bfCs, bfMaxL);

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: THEME.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: 8,
    display: 'block',
    fontFamily: THEME.typography.sans,
  };

  const attackTabs = [
    { id: 'dict', label: 'Dictionnaire', icon: 'ti-book' },
    { id: 'brute', label: 'Brute Force', icon: 'ti-cpu' },
    { id: 'hybrid', label: 'Règles Hybrides', icon: 'ti-adjustments' },
  ];

  return (
    <div>
      <Card>
        <SectionHeader
          icon="ti-bolt"
          title="Configuration de la simulation d'attaque"
        />
        <div style={{ marginBottom: 16 }}>
          <span style={labelStyle}>Chaîne cible (Payload)</span>
          <TextInput
            icon="ti-target"
            type="text"
            placeholder="ex: secret123, Admin@2024..."
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            disabled={running}
          />
          {target && (
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <span
                style={{
                  fontSize: 12,
                  color: THEME.colors.text.secondary,
                  background: THEME.colors.bg.secondary,
                  padding: '4px 10px',
                  borderRadius: THEME.radius.sm,
                  fontFamily: THEME.typography.mono,
                  border: `1px solid ${THEME.colors.border.primary}`,
                }}
              >
                {te.toFixed(1)} bits calculés
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: tq.color,
                  background: tq.bg,
                  padding: '4px 10px',
                  borderRadius: THEME.radius.sm,
                  border: `1px solid ${tq.color}30`,
                  fontFamily: THEME.typography.sans,
                }}
              >
                Profil : {tq.label}
              </span>
            </div>
          )}
        </div>

        <div>
          <span style={labelStyle}>Vecteur d'attaque</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {attackTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !running && setAttackType(tab.id)}
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  borderRadius: THEME.radius.md,
                  cursor: running ? 'not-allowed' : 'pointer',
                  border: `1px solid ${attackType === tab.id ? THEME.colors.text.info : THEME.colors.border.primary}`,
                  background:
                    attackType === tab.id
                      ? THEME.colors.bg.info
                      : THEME.colors.bg.primary,
                  color:
                    attackType === tab.id
                      ? THEME.colors.text.info
                      : THEME.colors.text.secondary,
                  fontFamily: THEME.typography.sans,
                  fontSize: 13,
                  fontWeight: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.15s ease',
                  opacity: running && attackType !== tab.id ? 0.4 : 1,
                  boxShadow: attackType === tab.id ? THEME.shadow.sm : 'none',
                }}
              >
                <i
                  className={`ti ${tab.icon}`}
                  style={{ fontSize: 18 }}
                  aria-hidden="true"
                />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {attackType === 'dict' && (
        <Card>
          <SectionHeader icon="ti-book" title="Spécification Dictionnaire" />
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
          >
            <div>
              <span style={labelStyle}>Volume de la Wordlist</span>
              <Select
                value={dictSize}
                onChange={(e) => setDictSize(e.target.value)}
                disabled={running}
              >
                <option value="10">Top 10 minimaliste</option>
                <option value="50">Top 50 standard</option>
                <option value="100">Top 100 étendu</option>
                <option value="500">Dictionnaire étendu (500)</option>
                <option value="rockyou">RockYou Wordlist (14M simulés)</option>
              </Select>
            </div>
            <div>
              <span style={labelStyle}>Vitesse d'interface</span>
              <Select
                value={dictSpeed}
                onChange={(e) => setDictSpeed(e.target.value)}
                disabled={running}
              >
                <option value="slow">Pas à pas (Pédagogique)</option>
                <option value="fast">Asynchrone haute performance</option>
              </Select>
            </div>
          </div>
        </Card>
      )}

      {attackType === 'brute' && (
        <Card>
          <SectionHeader icon="ti-cpu" title="Spécifications Brute Force" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <span style={labelStyle}>Alphabet de recherche</span>
              <Select
                value={bfCharset}
                onChange={(e) => setBfCharset(e.target.value)}
                disabled={running}
              >
                <option value="d">Numérique [0–9]</option>
                <option value="l">Minuscules [a–z]</option>
                <option value="ld">Alphanumérique bas [a–z, 0–9]</option>
                <option value="an">Alphanumérique complet</option>
                <option value="full">ASCII Étendu (Spéciaux inclus)</option>
              </Select>
            </div>
            <div>
              <span style={labelStyle}>Masque de longueur max</span>
              <Select
                value={bfMaxLen}
                onChange={(e) => setBfMaxLen(e.target.value)}
                disabled={running}
              >
                <option value="3">Maximum 3 caractères</option>
                <option value="4">Maximum 4 caractères</option>
                <option value="5">Maximum 5 caractères</option>
                <option value="6">Maximum 6 caractères</option>
              </Select>
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 12,
            }}
          >
            <StatCard
              value={bfCs.length}
              label="Taille alphabet"
              icon="ti-braces"
            />
            <StatCard
              value={fmtN(bfTotal)}
              label="Total Univers"
              icon="ti-infinity"
            />
            <StatCard
              value={fmtTime(bfTotal / 300000)}
              label="Calcul estimé"
              icon="ti-clock"
            />
          </div>
          {bfTotal > 5000000 && (
            <AlertBanner>
              Au-delà de 5M de combinaisons, le thread du navigateur se bridera
              pour éviter le freeze. Préférer une infrastructure GPU.
            </AlertBanner>
          )}
        </Card>
      )}

      {attackType === 'hybrid' && (
        <Card>
          <SectionHeader
            icon="ti-adjustments"
            title="Masques et mutations de chaînes"
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
            }}
          >
            {[
              {
                key: 'digits',
                label: 'Suffixes numériques',
                description: 'Ajoute de 0 à 99 en fin',
              },
              {
                key: 'cap',
                label: 'Capitalisation',
                description: 'Majuscule sur le premier caractère',
              },
              {
                key: 'leet',
                label: 'Substitutions Leet',
                description: 'Substitutions a→4, e→3, o→0',
              },
              {
                key: 'year',
                label: 'Suffixes temporels',
                description: 'Génère de 2020 à 2025',
              },
              {
                key: 'spec',
                label: 'Caractères spéciaux',
                description: 'Ajoute !, @, # en fin',
              },
              {
                key: 'rev',
                label: 'Inversion séquentielle',
                description: "Inverse l'ordre (pass → ssap)",
              },
              {
                key: 'dup',
                label: 'Duplication brute',
                description: 'Double le mot (passpass)',
              },
              {
                key: 'upper',
                label: 'Bloc Majuscule',
                description: 'Passe la chaîne en MAJUSCULES',
              },
            ].map(({ key, label, description }) => (
              <Toggle
                key={key}
                label={label}
                description={description}
                checked={hybridRules[key]}
                onChange={(e) =>
                  setHybridRules((prev) => ({
                    ...prev,
                    [key]: e.target.checked,
                  }))
                }
              />
            ))}
          </div>
        </Card>
      )}

      <Card>
        <SectionHeader icon="ti-activity" title="Télémétrie de l'exécution" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <StatCard value={fmtN(attempts)} label="Index" icon="ti-list-check" />
          <StatCard
            value={elapsed.toFixed(1) + 's'}
            label="Durée"
            icon="ti-clock"
          />
          <StatCard
            value={speed > 0 ? fmtN(speed) : '—'}
            label="Hachage/s"
            icon="ti-gauge"
          />
          <StatCard
            value={progress + '%'}
            label="Statut"
            icon="ti-trending-up"
          />
        </div>

        <div
          style={{
            background: THEME.colors.bg.secondary,
            border: `1px solid ${THEME.colors.border.primary}`,
            borderRadius: THEME.radius.sm,
            padding: '12px 14px',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: THEME.colors.text.tertiary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 6,
              fontFamily: THEME.typography.sans,
            }}
          >
            Mémoire tampon (Buffer)
          </div>
          <div
            style={{
              fontFamily: THEME.typography.mono,
              fontSize: 18,
              fontWeight: 500,
              color: THEME.colors.text.info,
              wordBreak: 'break-all',
              minHeight: 24,
            }}
          >
            {current}
          </div>
        </div>

        <div
          style={{
            height: 6,
            background: THEME.colors.bg.tertiary,
            borderRadius: THEME.radius.full,
            overflow: 'hidden',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              height: '100%',
              width: progress + '%',
              background: THEME.colors.text.info,
              transition: 'width 0.1s ease',
            }}
          />
        </div>

        {result && (
          <StatusBanner
            type={result.type}
            title={result.title}
            detail={result.detail}
          />
        )}

        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 16,
            justifyContent: 'flex-end',
          }}
        >
          {running ? (
            <Button variant="danger" icon="ti-player-stop" onClick={stopAttack}>
              Avorter l'opération
            </Button>
          ) : (
            <Button icon="ti-player-play" onClick={startAttack}>
              Lancer l'analyse
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// CONTENEUR GENERAL (Layout Professionnel)
// ============================================================

const TABS = [
  { id: 'gen', label: 'Générateur', icon: 'ti-key' },
  { id: 'login', label: 'Login simulé', icon: 'ti-login' },
  { id: 'attack', label: 'Attaque', icon: 'ti-bolt' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('gen');

  return (
    <div
      style={{
        fontFamily: THEME.typography.sans,
        color: THEME.colors.text.primary,
        minHeight: '100vh',
        background: THEME.colors.bg.tertiary,
      }}
    >
      {/* En-tête de l'application */}
      <header
        style={{
          borderBottom: `1px solid ${THEME.colors.border.primary}`,
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: THEME.colors.bg.primary,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: THEME.radius.md,
              background: THEME.colors.bg.info,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <i
              className="ti ti-shield-half"
              style={{ fontSize: 20, color: THEME.colors.text.info }}
              aria-hidden="true"
            />
          </div>
          <div>
            <h1
              style={{
                fontSize: 15,
                fontWeight: 600,
                margin: 0,
                color: THEME.colors.text.primary,
                letterSpacing: '-0.01em',
              }}
            >
              CyberLab Suite
            </h1>
            <p
              style={{
                fontSize: 11,
                color: THEME.colors.text.secondary,
                margin: 0,
              }}
            >
              Environnement académique de test cryptographique
            </p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: THEME.colors.bg.warning,
            border: `1px solid ${THEME.colors.border.warning}`,
            borderRadius: THEME.radius.full,
            padding: '4px 12px',
          }}
        >
          <i
            className="ti ti-flask"
            style={{ fontSize: 12, color: THEME.colors.text.warning }}
            aria-hidden="true"
          />
          <span
            style={{
              fontSize: 11,
              color: THEME.colors.text.warning,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            ...
          </span>
        </div>
      </header>

      {/* Barre de navigation */}
      <nav
        style={{
          display: 'flex',
          borderBottom: `1px solid ${THEME.colors.border.primary}`,
          background: THEME.colors.bg.primary,
          position: 'sticky',
          top: 61,
          zIndex: 90,
          padding: '0 24px',
          gap: 8,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '14px 16px',
              fontSize: 13,
              fontWeight: activeTab === t.id ? 600 : 500,
              cursor: 'pointer',
              color:
                activeTab === t.id
                  ? THEME.colors.text.info
                  : THEME.colors.text.secondary,
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${activeTab === t.id ? THEME.colors.text.info : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.15s ease',
              marginTop: '2px',
            }}
          >
            <i
              className={`ti ${t.icon}`}
              style={{
                fontSize: 16,
                color:
                  activeTab === t.id
                    ? THEME.colors.text.info
                    : THEME.colors.text.tertiary,
              }}
              aria-hidden="true"
            />
            {t.label}
          </button>
        ))}
      </nav>

      {/* Container d'application fluide */}
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px' }}>
        {activeTab === 'gen' && <PageGenerator />}
        {activeTab === 'login' && <PageLogin />}
        {activeTab === 'attack' && <PageAttack />}
      </main>

      {/* Pied de page technique */}
      <footer
        style={{
          borderTop: `1px solid ${THEME.colors.border.primary}`,
          padding: '16px 24px',
          textAlign: 'center',
          fontSize: 12,
          color: THEME.colors.text.tertiary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          background: THEME.colors.bg.primary,
          marginTop: '40px',
        }}
      >
        <i
          className="ti ti-shield-check"
          style={{ fontSize: 14 }}
          aria-hidden="true"
        />
        <span>
          CyberLab Suite • Utilisation restreinte au cadre de la recherche et de
          l'audit.
        </span>
      </footer>
    </div>
  );
}
