import React from 'react';

export default function Footer() {
    return(
        <div class="footer">
        <div class="container">
            <div class="row">
            <div class="col-md-6">
                <div class="site-info">
                <span>Reader</span><span>Destination</span>
           </div>
            </div>
            <div class="col-md-3">
                <div class="helpful-links">
                <span class="h-links">Helpful Links</span>
                <div class="row">
                    <div class="col">
                    <ul class="list-unstyled">
                        <li><a href="#">GitHup</a></li>
                        <li><a href="#">Twitter</a></li>
                    </ul>
                    </div>
                    <div class="col">
                    <ul class="list-unstyled">
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">SnapChat</a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="Contact">
                <span class="h-links">Contact Us</span>
                <ul class="list-unstyled">
                    <li>Phone: +966 555443322</li>
                    <li>
                    Email:
                    <a href="mailto:ReaderDes@gmail.com?subject=cotact"
                        >ReaderDes@gmail.com</a
                    >
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}