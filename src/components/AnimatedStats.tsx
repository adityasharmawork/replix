"use client";

import { useEffect, useState, useRef } from 'react';
import { Code, Globe, Shield, Trophy, Users, Zap } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stats: Stat[] = [
    {
      icon: <Code className="w-6 h-6 text-white" />,
      value: 10000,
      label: "Lines of Code",
      suffix: "+",
      duration: 6000
    },
    {
      icon: <Trophy className="w-6 h-6 text-white" />,
      value: 1,
      label: "Google Search",
      suffix: "#",
      duration: 5000
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      value: 1000,
      label: "Users",
      suffix: "+",
      duration: 3000
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      value: 75,
      label: "Countries",
      suffix: "+",
      duration: 3000
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      value: 93,
      label: "User Retention",
      suffix: "%",
      duration: 3000
    },
    // {
    //   icon: <Zap className="w-6 h-6 text-white" />,
    //   value: 99.9,
    //   label: "Uptime",
    //   suffix: "%",
    //   duration: 2000
    // },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-6 py-8 mb-44">
      <div className="md:px-32 md:mb-4" >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.slice(0, 2).map((stat, index) => (
            <AnimatedStatItem
              key={index}
              stat={stat}
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.slice(2).map((stat, index) => (
          <AnimatedStatItem
            key={index + 2}
            stat={stat}
            isVisible={isVisible}
            delay={(index + 2) * 200}
          />
        ))}
      </div>
    </div>
  );
};

interface AnimatedStatItemProps {
  stat: Stat;
  isVisible: boolean;
  delay: number;
}

const AnimatedStatItem = ({ stat, isVisible, delay }: AnimatedStatItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let timeoutId: NodeJS.Timeout;

    const startCounting = () => {
      const increment = Math.ceil(stat.value / 100);
      const intervalTime = (stat.duration || 2000) / 100;

      let currentCount = 0;
      const intervalId = setInterval(() => {
        currentCount = Math.min(currentCount + increment, stat.value);
        setCount(currentCount);

        if (currentCount >= stat.value) {
          clearInterval(intervalId);
        }
      }, intervalTime);

      return () => clearInterval(intervalId);
    };

    timeoutId = setTimeout(startCounting, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible, stat.value, stat.duration, delay]);

  return (
    <div className="frost-panel py-8 px-4 text-center animate-fade-in hover-glow group">
      <div className="mb-5 inline-flex p-4 rounded-lg bg-white/5 ring-1 ring-white/10">
        {stat.icon}
      </div>
      <div className="text-3xl font-bold text-white mb-3 flex items-center justify-center">
        <span className="tabular-nums">
          {count.toLocaleString()}
        </span>
        {stat.suffix && <span>{stat.suffix}</span>}
      </div>
      <div className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors">
        {stat.label}
      </div>
    </div>
  );
};

export default AnimatedStats;
