/**
 * StoryContainer
 *
 * Wrapper component for stories using fullscreen layout.
 * Provides proper spacing and max-width constraint for better readability.
 *
 * @example
 * ```tsx
 * export const MyStory: Story = {
 *   render: () => (
 *     <StoryContainer>
 *       <div style={{ display: 'grid', ... }}>
 *         {/* Your story content *\/}
 *       </div>
 *     </StoryContainer>
 *   ),
 * };
 * ```
 */
export const StoryContainer = ({ children }: { children: React.ReactNode }) => (
  <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>{children}</div>
);
