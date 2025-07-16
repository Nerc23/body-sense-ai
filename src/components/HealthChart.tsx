import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface HealthChartProps {
  data: Array<{ time: string; value: number; [key: string]: any }>;
  color: string;
  type?: "line" | "area";
  height?: number;
}

export function HealthChart({ data, color, type = "area", height = 200 }: HealthChartProps) {
  const ChartComponent = type === "line" ? LineChart : AreaChart;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ChartComponent data={data}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            strokeWidth={isMobile ? 0.5 : 1}
          />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            axisLine={false}
            interval={isMobile ? 1 : 0}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            axisLine={false}
            width={isMobile ? 30 : 40}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-card)',
              fontSize: isMobile ? '12px' : '14px'
            }}
          />
          {type === "area" ? (
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color}
              fill={color}
              fillOpacity={0.1}
              strokeWidth={isMobile ? 1.5 : 2}
            />
          ) : (
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color}
              strokeWidth={isMobile ? 1.5 : 2}
              dot={false}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}