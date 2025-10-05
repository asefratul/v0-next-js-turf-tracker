# 🌱 Turf Tracker

A comprehensive turf management dashboard designed specifically for golf courses, sports fields, and turf facilities. Plan, visualize, and track your complete annual treatment program with an intuitive drag-and-drop interface.

Demo: https://ar-turf-tracker.vercel.app/

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?style=flat-square&logo=tailwindcss)

## 📋 What is Turf Tracker?

Turf Tracker is a specialized application management tool built for turf professionals including:
- **Golf Course Superintendents** - Manage greens, fairways, and rough maintenance programs
- **Sports Turf Managers** - Track nutrition, protection, and disease management across fields
- **Facility Managers** - Plan and visualize year-round turf care schedules

The dashboard displays your entire program summary in a visual timeline format, making it easy to:
- See when treatments are scheduled throughout the year
- Identify gaps or overlaps in your program
- Adjust schedules by simply dragging applications to new dates
- Track treatment intensity and duration visually
- Organize programs by field, zone, or treatment type

## ✨ Key Features

### 📅 Smart Calendar Management
- **Dynamic Week Calculation** - Automatically calculates the correct number of weeks per month based on the current year
- **Seasonal Organization** - View your program organized by agricultural seasons (Winter, Spring, Summer, Autumn)
- **Month-by-Month Breakdown** - Each month shows its actual week count for precise planning

### 🎯 Drag & Drop Scheduling
- **Intuitive Rescheduling** - Click and drag any application to a new time slot
- **Duration Preservation** - Multi-week treatments move together as a unit
- **Smart Validation** - Prevents invalid scheduling beyond month boundaries
- **Automatic Adjustment** - Applications adapt if moved to months with fewer weeks

### 🎨 Visual Treatment Tracking
- **Color-Coded Categories**:
  - 🔵 **Blue** - Nutrition programs (foundation, energizers, vitalisers)
  - 🟠 **Orange** - Protection & prevention (weevils, nematodes)
  - 🟢 **Green** - Disease management (fungicides, pythium control)
  - 🔴 **Red** - Special events (renovations, overseeding)
  - 🟣 **Purple** - Private events & restrictions

- **Intensity Indicators** - Visual fade shows treatment effect over time:
  - **Week 1** - Dark color (heavy application/peak effect)
  - **Week 2** - Medium color (moderate activity)
  - **Week 3+** - Light color (residual protection)

### 📊 Program Organization
- **Field-Specific Programs** - Different treatment plans for different areas
- **Base vs. Add-On Programs** - Separate core programs from supplemental treatments
- **Product Details** - Each application shows product name and application rate
- **Multi-Product Tracking** - Manage complete programs with multiple products

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/turf-tracker.git
cd turf-tracker
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Use

### Viewing Your Program

The dashboard displays your annual program with:
- **Left Column** - Product names and application rates
- **Top Row** - Seasons and months with week counts
- **Grid** - Color-coded treatment boxes showing when applications occur

### Adding New Applications

Applications are defined in the `programData` array in `program-summary.tsx`:

\`\`\`typescript
{
  name: "Product Name @ Application Rate",
  applications: [
    createApplicationWithId({ 
      month: "JAN",      // Three-letter month code
      startWeek: 1,      // Week number within the month
      duration: 2,       // How many consecutive weeks
      color: "blue"      // Category color
    }),
  ].map(validateApplication),
}
\`\`\`

### Rescheduling Applications

1. **Locate** the application you want to move
2. **Hover** over the first week (you'll see a grip icon ⋮⋮)
3. **Click and drag** to the new position
4. **Drop** on any week cell to reschedule
5. The entire duration moves together automatically

### Understanding the Visual System

**Week Counting Rules:**
- Only weeks with 4+ days in a month are counted
- This ensures accurate scheduling across year boundaries
- February adapts for leap years automatically

**Color Intensity:**
- Darker shades = Recent application
- Lighter shades = Residual effect
- Multiple overlapping applications show layered protection

## 🏗️ Project Structure

\`\`\`
turf-tracker/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page entry point
│   └── globals.css         # Global styles and theme
├── components/
│   └── ui/                 # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── lib/
│   └── utils.ts            # Utility functions
├── program-summary.tsx     # Main dashboard component
└── README.md
\`\`\`

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Vercel Analytics](https://vercel.com/analytics)** - Usage insights

## 💡 Use Cases

### Golf Course Management
- Track greens renovation programs
- Manage fairway and rough nutrition schedules
- Plan disease prevention across all areas
- Schedule around tournaments and events

### Sports Field Management
- Coordinate multiple field treatments
- Track pre-season preparation programs
- Manage in-season maintenance windows
- Plan around game schedules

### Facility Planning
- Visualize year-round turf care
- Budget planning with treatment timelines
- Staff scheduling and workload distribution
- Vendor coordination and product ordering

## 🎯 Roadmap

- [ ] **Export Functionality**
  - [ ] PDF export for reporting
  - [ ] Excel export for budget planning
  - [ ] Print-optimized layouts

- [ ] **Data Management**
  - [ ] Database integration
  - [ ] Cloud sync across devices
  - [ ] Historical program comparison

- [ ] **Enhanced Features**
  - [ ] Weather integration
  - [ ] Growing degree day tracking
  - [ ] Cost calculation per application
  - [ ] Tank mix compatibility checker

- [ ] **Collaboration**
  - [ ] Multi-user support
  - [ ] Role-based permissions
  - [ ] Activity logs and change tracking
  - [ ] Team notifications

- [ ] **Mobile Experience**
  - [ ] Responsive design improvements
  - [ ] Touch-optimized drag-and-drop
  - [ ] Field notes and photos
  - [ ] Offline mode

## 🤝 Contributing

Contributions are welcome! Whether you're a turf professional with feature ideas or a developer wanting to improve the code, we'd love your input.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [v0.dev](https://v0.dev) - Vercel's AI-powered development tool
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspired by real-world turf management needs

## 📧 Contact

**Project Link:** [https://github.com/yourusername/turf-tracker](https://github.com/yourusername/turf-tracker)

**Deployed App:** [https://vercel.com/asefratul87-8460s-projects/v0-my-program-program-summary-view](https://vercel.com/asefratul87-8460s-projects/v0-my-program-program-summary-view)

---

Made with 💚 by turf professionals, for turf professionals

*Keep your turf healthy, your schedule organized, and your program on track.*
