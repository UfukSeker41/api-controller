# Contributing to API Documentation Explorer

First off, thank you for considering contributing to API Documentation Explorer! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. **Fork the repository**
2. **Create a new branch** from `main`
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow the existing code style
   - Write clear, commented code
   - Update documentation as needed
4. **Test your changes**
   ```bash
   npm run dev
   npm run build
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for all new files
- Follow the existing naming conventions
- Use functional components with hooks
- Write meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused
- Use Tailwind CSS for styling

### Project Structure

```
src/
├── app/          # Next.js app directory (pages, layouts, API routes)
├── components/   # Reusable React components
├── hooks/        # Custom React hooks
├── services/     # Business logic and external services
├── store/        # State management (Zustand)
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
└── data/         # Static data and constants
```

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

Examples:
```
Add API key encryption feature
Fix authentication callback error
Update README with installation steps
Refactor ApiTester component for better performance
```

### Development Setup

1. **Prerequisites**
   - Node.js 18+
   - npm, yarn, or pnpm

2. **Installation**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env.local`
   - Fill in your API credentials

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

### Testing

Currently, the project doesn't have automated tests. If you'd like to add testing infrastructure, that would be a great contribution!

Suggested testing tools:
- Jest for unit tests
- React Testing Library for component tests
- Playwright or Cypress for E2E tests

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment, trolling, or discriminatory language
- Publishing others' private information
- Any conduct that would be inappropriate in a professional setting

Thank you for contributing! 🚀
