import type { FC } from 'react';

interface PasswordStrengthProps {
  score: number; // 0: too weak, 1: weak, 2: medium, 3: strong, 4: very strong
}

const strengthLevels = [
  { text: 'Too weak', color: 'bg-destructive' },
  { text: 'Weak', color: 'bg-orange-500' },
  { text: 'Medium', color: 'bg-yellow-500' },
  { text: 'Strong', color: 'bg-lime-500' },
  { text: 'Very strong', color: 'bg-green-500' },
];

export const PasswordStrength: FC<PasswordStrengthProps> = ({ score }) => {
  const currentLevel = strengthLevels[Math.max(0, Math.min(score, strengthLevels.length - 1))];

  return (
    <div className="mt-2">
      <div className="flex h-2 overflow-hidden rounded bg-muted">
        {strengthLevels.map((_, index) => (
          <div
            key={index}
            className={`w-1/5 ${index <= score ? currentLevel.color : 'bg-muted'}`}
            style={{ transition: 'background-color 0.3s ease' }}
          />
        ))}
      </div>
      <p className={`mt-1 text-xs ${
        score === 0 ? 'text-destructive' : 
        score === 1 ? 'text-orange-500' :
        score === 2 ? 'text-yellow-600' :
        score === 3 ? 'text-lime-600' :
        'text-green-600'
      }`}>
        Strength: {currentLevel.text}
      </p>
    </div>
  );
};

// Basic password score calculation (example)
// In a real app, use a library like zxcvbn
export function calculatePasswordScore(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++; // Special character
  
  if (password.length < 8 && score > 1) score = 1; // Cap score if too short but has variety
  if (password.length < 6) return 0;

  return Math.min(score -1, 4); // ensure score is between 0 and 4
}
