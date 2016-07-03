using System;
using Xunit;

namespace <%= namespace %>
{
    public class Class1Test
    {
        [Fact]
        public void SomeTest()
        {
            Assert.Equal(0, 1);
        }

        [Fact]
        public void SomeOtherTest()
        {
            Assert.Equal("abc", "a" + "b" + "c");
        }

        [Theory]
        [InlineData(1, 2, 3)]
        [InlineDataAttribute(0, 1, 1)]
        public void AddTest(int a, int b, int s)
        {

        }

        public int Sum(int a, int b)
        {
            return a + b;
        }
    }
}
