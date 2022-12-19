export default function Footer(): string {
    return `
        <div class="footer-wrapper wrapper">
            <div class="footer__author">
                <a class="footer__author_github_link" href="https://github.com/DeFranS325">
                    <img class="footer__author_github_img" src="./assets/svg/github.svg" />
                    <span class="footer__author_github_name">DeFranS325</span>
                </a>
                <a class="footer__author_github_link" href="https://github.com/sohodoll">
                    <img class="footer__author_github_img" src="./assets/svg/github.svg" />
                    <span class="footer__author_github_name">Sohodoll</span>
                </a>
            </div>
            <div class="footer__site-year">2022</div>
            <div class="footer__rsshool">
                <a class="footer__rsshool_link" href="https://rs.school/js/">
                    <img class="footer__rsshool_img" src="./assets/svg/rs_school.svg" />
                </a>
            </div>
        </div>
    `;
}