"use strict"

var path = require("path")

var linter = require("eslint").linter
  , ESLintTester = require("eslint-tester")

var eslintTester = new ESLintTester(linter)

var FILENAME = path.join(process.cwd(), "tests", "files", "test_file.js")

eslintTester.addRuleTest(
  "lib/rules/no-unrequired",

  { valid:

    [ { code: "var foo = proxyquire('./foo', {'./bar': {}});"
      , filename: FILENAME
      }
    ]

  , invalid:

    [ { code: "var foo = proxyquire('./foo', {'./baz': {}});"
      , errors:
        [ { message: "Module './baz' is not required by module './foo'."
          , type: "Literal"
          }
        ]
      }
    ]

  })
