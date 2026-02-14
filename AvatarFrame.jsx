import { Crown, Sparkles, Flame, Snowflake, Star, Rainbow, Zap, Skull, Heart, Feather, Shield, Target, Hexagon } from 'lucide-react';

const FRAME_CONFIGS = {
  default: null,
  crown_top: {
    type: 'top',
    icon: Crown,
    gradient: 'from-yellow-500 to-orange-500',
  },
  sparkle_around: {
    type: 'ring',
    gradient: 'from-purple-500 to-pink-500'
  },
  flame_aura: {
    type: 'aura',
    gradient: 'from-orange-500 to-red-500',
    animation: 'animate-pulse'
  },
  ice_spikes: {
    type: 'spikes',
    gradient: 'from-cyan-500 to-blue-500'
  },
  star_orbit: {
    type: 'orbit',
    icon: Star,
    gradient: 'from-yellow-400 to-orange-400'
  },
  rainbow_glow: {
    type: 'glow',
    gradient: 'from-red-500 via-purple-500 to-blue-500',
    animation: 'animate-pulse'
  },
  cosmic_ring: {
    type: 'cosmic',
    gradient: 'from-violet-500 via-fuchsia-500 to-pink-500',
    animation: 'animate-spin'
  },
  toxic_hazard: {
    type: 'double-ring',
    gradient: 'from-lime-500 to-green-500',
    animation: 'animate-pulse'
  },
  blood_moon: {
    type: 'glow',
    gradient: 'from-red-600 to-red-900',
    animation: 'animate-pulse'
  },
  lightning_bolt: {
    type: 'bolts',
    icon: Zap,
    gradient: 'from-yellow-400 to-yellow-600'
  },
  crystal_cage: {
    type: 'corners',
    gradient: 'from-cyan-400 to-blue-500'
  },
  void_portal: {
    type: 'spiral',
    gradient: 'from-purple-600 via-pink-600 to-purple-900',
    animation: 'animate-spin'
  },
  dragon_scales: {
    type: 'scales',
    gradient: 'from-red-700 to-orange-600'
  },
  demon_horns: {
    type: 'horns',
    gradient: 'from-red-600 to-gray-900'
  },
  angel_wings: {
    type: 'wings',
    icon: Feather,
    gradient: 'from-white to-blue-200'
  },
  neon_pulse: {
    type: 'neon',
    gradient: 'from-cyan-400 to-purple-500',
    animation: 'animate-pulse'
  },
  laser_grid: {
    type: 'grid',
    gradient: 'from-green-400 to-emerald-500'
  },
  skull_crown: {
    type: 'top',
    icon: Skull,
    gradient: 'from-gray-400 to-gray-700'
  },
  flower_bloom: {
    type: 'petals',
    gradient: 'from-pink-400 to-rose-500'
  }
};

export default function AvatarFrame({ frameId = 'default', size = 'md', children }) {
  const config = FRAME_CONFIGS[frameId];
  
  if (!config) {
    return <div className="relative inline-flex items-center justify-center">{children}</div>;
  }

  const containerPadding = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  const orbitRadius = {
    sm: 24,
    md: 28,
    lg: 36
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${containerPadding[size]}`}>
      {/* Top decoration (crown, skull, etc) */}
      {config.type === 'top' && config.icon && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10">
          <div className={`bg-gradient-to-r ${config.gradient} p-1.5 rounded-lg shadow-lg ${config.animation || ''}`}>
            <config.icon className={iconSizes[size]} />
          </div>
        </div>
      )}

      {/* Ring decoration */}
      {config.type === 'ring' && (
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.gradient} opacity-50 blur-sm ${config.animation || ''}`} />
      )}

      {/* Double ring */}
      {config.type === 'double-ring' && (
        <>
          <div className={`absolute inset-1 rounded-full border-2 border-transparent bg-gradient-to-r ${config.gradient} ${config.animation || ''}`} 
            style={{ WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
          />
          <div className={`absolute inset-3 rounded-full border-2 border-transparent bg-gradient-to-r ${config.gradient} ${config.animation || ''}`} 
            style={{ WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
          />
        </>
      )}

      {/* Aura effect */}
      {config.type === 'aura' && (
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.gradient} opacity-40 blur-md ${config.animation || ''}`} />
      )}

      {/* Spikes around */}
      {config.type === 'spikes' && (
        <>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div
              key={deg}
              className={`absolute top-1/2 left-1/2 bg-gradient-to-b ${config.gradient}`}
              style={{
                width: '3px',
                height: size === 'sm' ? '12px' : size === 'md' ? '16px' : '20px',
                transformOrigin: 'center',
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-${size === 'sm' ? '24' : size === 'md' ? '28' : '36'}px)`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            />
          ))}
        </>
      )}

      {/* Orbiting stars */}
      {config.type === 'orbit' && config.icon && (
        <div className="absolute inset-0">
          {[0, 120, 240].map((deg, i) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                animation: `orbit 3s linear infinite ${i * 1}s`
              }}
            >
              <div
                style={{
                  transform: `rotate(${deg}deg) translateX(${orbitRadius[size]}px) rotate(-${deg}deg)`
                }}
              >
                <config.icon className={`${iconSizes[size]} text-yellow-400`} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Glow */}
      {config.type === 'glow' && (
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.gradient} opacity-50 blur-lg ${config.animation || ''}`} />
      )}

      {/* Cosmic rotating ring */}
      {config.type === 'cosmic' && (
        <div className={`absolute inset-1 rounded-full border-4 bg-gradient-to-r ${config.gradient} ${config.animation || ''}`} 
          style={{
            borderImageSlice: 1,
            borderImageSource: `linear-gradient(to right, currentColor, currentColor)`
          }}
        />
      )}

      {/* Lightning bolts */}
      {config.type === 'bolts' && config.icon && (
        <>
          {[45, 135, 225, 315].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-${size === 'sm' ? '22' : size === 'md' ? '26' : '34'}px)`
              }}
            >
              <config.icon className={`${iconSizes[size]} text-yellow-400`} />
            </div>
          ))}
        </>
      )}

      {/* Corner decorations */}
      {config.type === 'corners' && (
        <>
          {[0, 90, 180, 270].map((deg) => (
            <div
              key={deg}
              className={`absolute w-3 h-3 bg-gradient-to-r ${config.gradient}`}
              style={{
                top: deg === 0 || deg === 90 ? '2px' : 'auto',
                bottom: deg === 180 || deg === 270 ? '2px' : 'auto',
                left: deg === 0 || deg === 270 ? '2px' : 'auto',
                right: deg === 90 || deg === 180 ? '2px' : 'auto',
                clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                transform: `rotate(${deg}deg)`
              }}
            />
          ))}
        </>
      )}

      {/* Spiral effect */}
      {config.type === 'spiral' && (
        <div className={`absolute inset-0 rounded-full`}>
          <div className={`absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r ${config.gradient} ${config.animation || ''}`}
            style={{
              WebkitMask: 'conic-gradient(from 0deg, transparent 0%, black 50%, transparent 100%)',
              mask: 'conic-gradient(from 0deg, transparent 0%, black 50%, transparent 100%)'
            }}
          />
        </div>
      )}

      {/* Dragon scales */}
      {config.type === 'scales' && (
        <div className={`absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r ${config.gradient}`}
          style={{
            borderStyle: 'dashed',
            borderWidth: '3px'
          }}
        />
      )}

      {/* Demon horns */}
      {config.type === 'horns' && (
        <>
          <div className={`absolute -top-2 left-2 w-4 h-6 bg-gradient-to-b ${config.gradient} rounded-t-full`}
            style={{ transform: 'rotate(-20deg)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
          <div className={`absolute -top-2 right-2 w-4 h-6 bg-gradient-to-b ${config.gradient} rounded-t-full`}
            style={{ transform: 'rotate(20deg)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
        </>
      )}

      {/* Angel wings */}
      {config.type === 'wings' && config.icon && (
        <>
          <div className="absolute top-1/2 -left-2 -translate-y-1/2">
            <config.icon className={`${iconSizes[size]} text-white opacity-80`} style={{ transform: 'rotate(-30deg)' }} />
          </div>
          <div className="absolute top-1/2 -right-2 -translate-y-1/2">
            <config.icon className={`${iconSizes[size]} text-white opacity-80`} style={{ transform: 'rotate(30deg) scaleX(-1)' }} />
          </div>
        </>
      )}

      {/* Neon pulse */}
      {config.type === 'neon' && (
        <>
          <div className={`absolute inset-0 rounded-full border-2 bg-gradient-to-r ${config.gradient} ${config.animation || ''}`} />
          <div className={`absolute inset-2 rounded-full border-2 bg-gradient-to-r ${config.gradient} ${config.animation || ''}`} />
        </>
      )}

      {/* Laser grid */}
      {config.type === 'grid' && (
        <div className={`absolute inset-0 rounded-full`}>
          {[0, 90, 180, 270].map((deg) => (
            <div
              key={deg}
              className={`absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r ${config.gradient}`}
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg)`
              }}
            />
          ))}
        </div>
      )}

      {/* Flower petals */}
      {config.type === 'petals' && (
        <>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={deg}
              className={`absolute top-1/2 left-1/2 w-3 h-5 bg-gradient-to-t ${config.gradient} rounded-full`}
              style={{
                transformOrigin: 'center',
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-${size === 'sm' ? '20' : size === 'md' ? '24' : '30'}px)`,
                opacity: 0.8
              }}
            />
          ))}
        </>
      )}

      {/* Avatar */}
      <div className="relative z-10">
        {children}
      </div>

      <style>{`
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
