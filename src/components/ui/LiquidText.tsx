
import styles from './LiquidText.module.css';

interface LiquidTextProps {
    children: React.ReactNode;
    className?: string;
}

const LiquidText: React.FC<LiquidTextProps> = ({ children, className }) => {
    const id = `liquid-filter-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`${styles.liquidWrapper} ${className || ''}`}
            style={{ filter: `url(#${id})` }}
            onMouseEnter={() => {
                const el = document.getElementById(id)?.querySelector('feDisplacementMap');
                if (el) el.setAttribute('scale', '20');
                const turb = document.getElementById(id)?.querySelector('feTurbulence');
                if (turb) turb.setAttribute('baseFrequency', '0.04 0.08');
            }}
            onMouseLeave={() => {
                const el = document.getElementById(id)?.querySelector('feDisplacementMap');
                if (el) el.setAttribute('scale', '0');
                const turb = document.getElementById(id)?.querySelector('feTurbulence');
                if (turb) turb.setAttribute('baseFrequency', '0 0');
            }}
        >
            <svg className={styles.filterSvg}>
                <defs>
                    <filter id={id}>
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0 0"
                            numOctaves="1"
                            result="warp"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="warp"
                            scale="0"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>
            <span style={{ display: 'inline-block', transition: 'all 0.3s' }}>{children}</span>
        </div>
    );
};

export default LiquidText;
