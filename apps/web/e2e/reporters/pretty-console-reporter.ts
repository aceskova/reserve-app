import type { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";

function color(text: string, ansiColor: string) {
  return `${ansiColor}${text}${RESET}`;
}

function getStatusMark(status: TestResult["status"]) {
  if (status === "passed") {
    return color("✓", GREEN);
  }

  if (status === "skipped") {
    return color("-", YELLOW);
  }

  return color("✗", RED);
}

export default class PrettyConsoleReporter implements Reporter {
  private currentSuite = "";
  private passed = 0;
  private failed = 0;
  private skipped = 0;

  onTestEnd(test: TestCase, result: TestResult) {
    const suite = test.parent.title || test.location.file;
    const mark = getStatusMark(result.status);

    if (result.status === "passed") {
      this.passed += 1;
    } else if (result.status === "skipped") {
      this.skipped += 1;
    } else {
      this.failed += 1;
    }

    if (suite !== this.currentSuite) {
      if (this.currentSuite) {
        console.log("");
      }

      console.log(suite);
      this.currentSuite = suite;
    }

    console.log(`  ${mark} ${test.title}`);

    if (result.status !== "passed" && result.error?.message) {
      const firstErrorLine =
        result.error.message.split("\n")[0] ?? "Test failed";

      console.log(`    ${color(firstErrorLine, RED)}`);
    }
  }

  onEnd() {
    const parts = [
      color(`${this.passed} passed`, GREEN),
      this.failed > 0 ? color(`${this.failed} failed`, RED) : null,
      this.skipped > 0 ? color(`${this.skipped} skipped`, YELLOW) : null,
    ].filter(Boolean);

    console.log("");
    console.log(parts.join(", "));
  }
}
