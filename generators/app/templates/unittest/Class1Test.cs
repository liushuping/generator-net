using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            Assert.Equal("abc", "a"+"b"+"c");
        }
    }
}
