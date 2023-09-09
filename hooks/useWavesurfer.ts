import { useState, useEffect } from 'react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';

const useWavesurfer = (options: WaveSurferOptions) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  useEffect(() => {
    if (!options.container) return;

    if (typeof document !== 'undefined') {
      const ctx = document.createElement('canvas').getContext('2d');
      const gradient = ctx?.createLinearGradient(0, 0, 0, 150);
      gradient?.addColorStop(0, 'rgb(56,197,238)');
      gradient?.addColorStop(0.15, 'rgb(94,134,233)');
      gradient?.addColorStop(0.3, 'rgb(116,97,230)');

      const defaultOptions = {
        waveColor: ['rgb(132, 132, 132)'],
        progressColor: gradient,
        height: 42,
        barHeight: 1,
        barWidth: 1,
        barGap: 3,
        barRadius: 0,
        normalize: false,
        barAlign: '',
      };

      const renderItem = (channelData, ctx) => {
        const topChannel = channelData[0];
        const bottomChannel = channelData[1] || channelData[0];
        const length = topChannel.length;
        const pixelRatio = window.devicePixelRatio || 1;
        const { width, height } = ctx.canvas;
        const halfHeight = height / 2;
        const barHeight = defaultOptions.barHeight || 1;
        const barWidth = defaultOptions.barWidth ? defaultOptions.barWidth * pixelRatio : 1;
        const barGap = defaultOptions.barGap
          ? defaultOptions.barGap * pixelRatio
          : defaultOptions.barWidth
          ? barWidth / 2
          : 0;
        const barRadius = defaultOptions.barRadius || 0;
        const barIndexScale = width / (barWidth + barGap) / length;
        let max = 1;
        if (defaultOptions.normalize) {
          max = 0;
          for (let i = 0; i < length; i++) {
            const value = Math.abs(topChannel[i]);
            if (value > max) max = value;
          }
        }
        const vScale = (halfHeight / max) * barHeight;
        const rectFn = barRadius && 'roundRect' in ctx ? 'roundRect' : 'rect';
        ctx.beginPath();
        let prevX = 0;
        let maxTop = 0;
        let maxBottom = 0;
        for (let i = 0; i <= length; i++) {
          const x = Math.round(i * barIndexScale);
          if (x > prevX) {
            const leftBarHeight = Math.round(maxTop * vScale);
            const rightBarHeight = Math.round(maxBottom * vScale);
            const barHeight = leftBarHeight + rightBarHeight || 1;
            // Vertical alignment
            let y = halfHeight - (barHeight / 2);
            if (defaultOptions.barAlign === 'top')
              y = 0;
            else if (defaultOptions.barAlign === 'bottom')
              y = height - barHeight;
            ctx[rectFn](prevX * (barWidth + barGap), y, barWidth, barHeight, barRadius);
            prevX = x;
            maxTop = 0;
            maxBottom = 0;
          }
          const magnitudeTop = Math.abs(topChannel[i] || 0);
          const magnitudeBottom = Math.abs(bottomChannel[i] || 0);
          if (magnitudeTop > maxTop) maxTop = magnitudeTop;
          if (magnitudeBottom > maxBottom) maxBottom = magnitudeBottom;
        }
        ctx.fill();
        ctx.closePath();
      };

      const ws = WaveSurfer.create({
        ...options,
        autoplay: false,
        height: 42,
        waveColor: ['rgb(132, 132, 132)'],
        progressColor: gradient,
        barWidth: 1,
        barGap: 3,
        barRadius: 0,
        renderFunction: renderItem,
      });

      setWavesurfer(ws);

      return () => {
        ws.destroy();
      };
    }
  }, [options.url, options.container]);

  return wavesurfer as WaveSurfer;
};

export default useWavesurfer;
