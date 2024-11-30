import { cutNumber } from './cutNumber'

describe('cutNumber', () => {
  test('should return zero', () => {
    const result = cutNumber(0)
    expect(result).toBe('0')
  })

  test('should remove minus', () => {
    const result = cutNumber(-234)
    expect(result).toBe('234')
  })

  test('should add thousand suffix', () => {
    expect(cutNumber(1_000)).toBe('1k')
    expect(cutNumber(92_456)).toBe('92k')
    expect(cutNumber(145_000)).toBe('145k')
    expect(cutNumber(999_999)).toBe('999k')
  })

  test('should add million suffix', () => {
    expect(cutNumber(1_000_000)).toBe('1M')
    expect(cutNumber(56_562_562)).toBe('56M')
    expect(cutNumber(562_562_562)).toBe('562M')
    expect(cutNumber(999_999_999)).toBe('999M')
  })

  test('should add billion suffix', () => {
    expect(cutNumber(1_000_000_000)).toBe('1B')
    expect(cutNumber(37_562_562_000)).toBe('37B')
    expect(cutNumber(491_562_562_111)).toBe('491B')
    expect(cutNumber(999_999_999_999)).toBe('999B')
  })

  test('should correct work with num >= trillion', () => {
    const result = cutNumber(1_000_000_000_000)
    expect(result).toBe('999B+')
  })

  test('should correct work with exponent format', () => {
    const result = cutNumber(1e6)
    expect(result).toBe('1M')
  })

  test('should correct work with decimal', () => {
    const result = cutNumber(7931.44)
    expect(result).toBe('7k')
  })
})
